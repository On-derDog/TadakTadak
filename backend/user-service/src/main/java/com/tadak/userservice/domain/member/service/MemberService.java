package com.tadak.userservice.domain.member.service;

import com.tadak.userservice.domain.member.dto.request.LoginRequestDto;
import com.tadak.userservice.domain.member.dto.request.SignupRequestDto;
import com.tadak.userservice.domain.member.dto.response.SignupResponseDto;
import com.tadak.userservice.domain.member.entity.Member;
import com.tadak.userservice.domain.member.entity.Role;
import com.tadak.userservice.domain.member.entity.State;
import com.tadak.userservice.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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

    public void login(LoginRequestDto loginRequestDto) {
        Member member = memberRepository.findByEmail(loginRequestDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("해당 email이 존재하지 않습니다."));

        validMemberState(member);

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    /**
     * 비밀번호 검증
     */
    private void passwordConfirm(String password, String passwordConfirm) {
        if (!password.equals(passwordConfirm)){
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
    }

    /**
     * Member state 검증
     */
    private static void validMemberState(Member member) {
        if (member.getState() == State.DELETE){
            throw new IllegalArgumentException("현재 비활성화된 계정입니다.");
        }
    }

    public Member saveMember(SignupRequestDto memberDto){
        return Member.builder()
                .email(memberDto.getEmail())
                .username(memberDto.getUsername())
                .password(passwordEncoder.encode(memberDto.getPassword()))
                .state(State.ACTIVE)
                .role(Role.ROLE_USER)
                .build();
    }
}
