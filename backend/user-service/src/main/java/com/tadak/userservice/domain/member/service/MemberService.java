package com.tadak.userservice.domain.member.service;

import com.tadak.userservice.domain.member.dto.request.LoginRequestDto;
import com.tadak.userservice.domain.member.dto.request.SignupRequestDto;
import com.tadak.userservice.domain.member.dto.response.SignupResponseDto;
import com.tadak.userservice.domain.member.dto.response.TokenResponseDto;
import com.tadak.userservice.domain.member.entity.Member;
import com.tadak.userservice.domain.member.entity.Role;
import com.tadak.userservice.domain.member.entity.State;
import com.tadak.userservice.domain.member.repository.MemberRepository;
import com.tadak.userservice.domain.refresh.entity.RefreshToken;
import com.tadak.userservice.domain.refresh.repository.RefreshTokenRepository;
import com.tadak.userservice.global.jwt.filter.JwtFilter;
import com.tadak.userservice.global.jwt.provider.TokenProvider;
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

    @Transactional
    public SignupResponseDto signup(SignupRequestDto signupRequestDto) {
        // 추후 Exception custom
        if (memberRepository.existsByEmail(signupRequestDto.getEmail())){
            throw new IllegalAccessError("해당 이메일은 현재 존재합니다.");
        }

        if (memberRepository.existsByUsername(signupRequestDto.getUsername())){
            throw new IllegalAccessError("해당 유저이름은 현재 존재합니다.");
        }

        passwordConfirm(signupRequestDto.getPassword(), signupRequestDto.getPasswordConfirm());

        Member member = saveMember(signupRequestDto);
        memberRepository.save(member);

        return SignupResponseDto.from(member);
    }

    //TODO: login 로직 수정하기
    public ResponseEntity<TokenResponseDto> login(LoginRequestDto loginRequestDto) {
        Member member = memberRepository.findByEmail(loginRequestDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("해당 email이 존재하지 않습니다."));

        validMemberState(member); // member State 검증

        Authentication authentication = getAuthentication(loginRequestDto);

        String accessToken = tokenProvider.createAccessToken(authentication);
        String refreshToken;

        if (!refreshTokenRepository.existsByEmail(authentication.getName())) {
            refreshToken = tokenProvider.createRefreshToken(authentication);

            RefreshToken resultRefreshToken = getRefreshToken(member, refreshToken);
            refreshTokenRepository.save(resultRefreshToken);
        } else {
            refreshToken = refreshTokenRepository.getValues(authentication.getName());
        }

        HttpHeaders httpHeaders = createResponseHeaders(accessToken, refreshToken); // header 정보 넣어주기!
        TokenResponseDto tokenResponseDto = tokenProvider.createTokenResponseDto(accessToken, refreshToken);
        return new ResponseEntity<>(tokenResponseDto, httpHeaders, HttpStatus.OK);
    }

    // login Member 정보 받아오기
    private Authentication getAuthentication(LoginRequestDto loginRequestDto) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return authentication;
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
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
    }

    /**
     * Member state 검증
     * @param member
     */
    private static void validMemberState(Member member) {
        if (member.getState() == State.DELETE){
            throw new IllegalArgumentException("현재 비활성화된 계정입니다.");
        }
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
    private static RefreshToken getRefreshToken(Member member, String refreshToken) {
        return RefreshToken.builder()
                .refreshToken(refreshToken)
                .email(member.getEmail())
                .build();
    }
}
