package com.tadak.userservice.domain.member.service;

import com.tadak.userservice.domain.email.dto.EmailResponseDto;
import com.tadak.userservice.domain.email.service.EmailService;
import com.tadak.userservice.domain.member.dto.request.LoginRequestDto;
import com.tadak.userservice.domain.member.dto.request.SignupRequestDto;
import com.tadak.userservice.domain.member.dto.response.*;
import com.tadak.userservice.domain.member.entity.Member;
import com.tadak.userservice.domain.member.entity.Role;
import com.tadak.userservice.domain.member.entity.State;
import com.tadak.userservice.domain.member.exception.*;
import com.tadak.userservice.domain.member.repository.MemberRepository;
import com.tadak.userservice.domain.refresh.entity.RefreshToken;
import com.tadak.userservice.domain.refresh.repository.RefreshTokenRepository;
import com.tadak.userservice.global.error.ErrorCode;
import com.tadak.userservice.global.jwt.filter.JwtFilter;
import com.tadak.userservice.global.jwt.provider.TokenProvider;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final EmailService emailService;

    @Transactional
    public SignupResponseDto signup(SignupRequestDto signupRequestDto) {
        // 추후 Exception custom
        if (memberRepository.existsByEmail(signupRequestDto.getEmail())){
            throw new DuplicateMemberEmailException(ErrorCode.DUPLICATE_MEMBER_EMAIL_ERROR);
        }

        if (memberRepository.existsByUsername(signupRequestDto.getUsername())){
            throw new DuplicateMemberUsernameException(ErrorCode.DUPLICATE_MEMBER_USERNAME_ERROR);
        }

        String authCode = signupRequestDto.getAuthCode();
        EmailResponseDto emailResponseDto = emailService.verifyEmailCode(signupRequestDto.getEmail(), authCode);
        if (!emailResponseDto.isEmailVerified()) {
            throw new EmailNotVerifiedException(ErrorCode.EMAIL_NOT_VERIFIED_ERROR);
        }

        passwordConfirm(signupRequestDto.getPassword(), signupRequestDto.getPasswordConfirm());

        Member member = saveMember(signupRequestDto);
        memberRepository.save(member);

        return SignupResponseDto.from(member);
    }

    public ResponseEntity<TokenResponseDto> login(LoginRequestDto loginRequestDto) {
        Authentication authentication = getAuthentication(loginRequestDto);

        String accessToken = tokenProvider.createAccessToken(authentication);
        String refreshToken;

        if (!refreshTokenRepository.existsByEmail(authentication.getName())
                || refreshTokenRepository.getValues(authentication.getName()).length() < 11) {
            refreshToken = tokenProvider.createRefreshToken(authentication);

            RefreshToken resultRefreshToken = getRefreshToken(loginRequestDto.getEmail(), refreshToken);
            refreshTokenRepository.save(resultRefreshToken);
        } else {
            refreshToken = refreshTokenRepository.getValues(authentication.getName());
        }

        HttpHeaders httpHeaders = createResponseHeaders(accessToken, refreshToken); // header 정보 넣어주기!
        // 현재 사용하지 않음 (body로 토큰을 전달해주지 않기때문)
        TokenResponseDto tokenResponseDto = tokenProvider.createTokenResponseDto(accessToken, refreshToken);
        return new ResponseEntity<>(httpHeaders, HttpStatus.OK);
    }

    // login Member 정보 받아오기
    private Authentication getAuthentication(LoginRequestDto loginRequestDto) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return authentication;
    }

    @Transactional
    public void logout(String email, String loginEmail) {
        if (!validLoginMember(email, loginEmail)){
            throw new NotMatchLogoutException(ErrorCode.NOT_MATCH_LOGOUT_EXCEPTION);
        }

        refreshTokenRepository.deleteEmail(email);
    }

    public DuplicateCheckResponseDto existsUsername(String username) {
        if (memberRepository.existsByUsername(username)){
            throw new DuplicateMemberUsernameException(ErrorCode.DUPLICATE_MEMBER_USERNAME_ERROR);
        }

        return DuplicateCheckResponseDto.of(true);
    }

    public CheckEmailResponseDto existsEmail(String email) throws MessagingException {
        if (memberRepository.existsByEmail(email)){
            throw new DuplicateMemberEmailException(ErrorCode.DUPLICATE_MEMBER_EMAIL_ERROR);
        }

        // 이메일 인증 보내기!
        emailService.sendEmail(email);

        return CheckEmailResponseDto.of(true, LocalDateTime.now().plusMinutes(2));
    }

    /**
     * Header 부분에 token 넣어주기
     * @param accessToken
     * @param refreshToken
     */
    private HttpHeaders createResponseHeaders(String accessToken, String refreshToken) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.ACCESS_AUTHORIZATION_HEADER, "Bearer " + accessToken);
        httpHeaders.add(JwtFilter.REFRESH_AUTHORIZATION_HEADER, "Bearer " + refreshToken);
        return httpHeaders;
    }

    /**
     * 비밀번호 검증
     * @param password // 비밀번호
     * @param passwordConfirm // 비밀번호 확인
     */
    private void passwordConfirm(String password, String passwordConfirm) {
        if (!password.equals(passwordConfirm)){
            throw new NotMatchPasswordException(ErrorCode.NOT_MATCH_PASSWORD_ERROR);
        }
    }


    /**
     * loginMember 검증
     */
    private boolean validLoginMember(String email, String loginEmail) {
        return email.equals(loginEmail);
    }

    /**
     * 멤버 저장
     * @param memberDto
     */
    public Member saveMember(SignupRequestDto memberDto){
        return Member.builder()
                .email(memberDto.getEmail())
                .username(memberDto.getUsername())
                .password(passwordEncoder.encode(memberDto.getPassword()))
                .state(State.ACTIVE)
                .role(Role.ROLE_USER)
                .build();
    }

    /**
     * reFresh token 추출
     */
    private static RefreshToken getRefreshToken(String email, String refreshToken) {
        return RefreshToken.builder()
                .refreshToken(refreshToken)
                .email(email)
                .build();
    }

    public MemberResponseDto findByMember(String token) {

        if (StringUtils.hasText(token) && token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        Authentication authentication = tokenProvider.getAuthentication(token);
        Member member = memberRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new NotFoundMemberException(ErrorCode.NOT_FOUND_MEMBER_ERROR));

        log.info("member id = {}", member.getId());
        log.info("member email = {}", member.getEmail());
        log.info("member username = {}", member.getUsername());

        return MemberResponseDto.from(member);
    }
}
