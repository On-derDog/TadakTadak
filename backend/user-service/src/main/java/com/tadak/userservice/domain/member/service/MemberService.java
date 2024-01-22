package com.tadak.userservice.domain.member.service;

import com.tadak.userservice.domain.member.dto.request.SignupRequestDto;
import com.tadak.userservice.domain.member.dto.response.SignupResponseDto;
import com.tadak.userservice.domain.member.entity.Member;
import com.tadak.userservice.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;

    @Transactional
    public SignupResponseDto signup(SignupRequestDto signupRequestDto) {
        // 추후 Exception custom
        if (memberRepository.existsByEmail(signupRequestDto.getEmail())){
            throw new IllegalAccessError("해당 이메일은 현재 존재합니다.");
        }

        if (memberRepository.existsByUsername(signupRequestDto.getUsername())){
            throw new IllegalAccessError("해당 유저이름은 현재 존재합니다.");
        }

        Member member = SignupRequestDto.toEntity(signupRequestDto);
        memberRepository.save(member);

        return SignupResponseDto.from(member);
    }


}
