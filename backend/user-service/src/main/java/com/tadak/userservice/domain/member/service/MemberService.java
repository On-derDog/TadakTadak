package com.tadak.userservice.domain.member.service;

import com.tadak.userservice.domain.member.dto.request.MemberDto;
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
    public MemberDto signup(MemberDto memberdto) {
        if (memberRepository.existsByEmail(memberdto.getEmail())){
            throw new IllegalAccessError("해당 이메일은 현재 존재합니다.");
        }

        if (memberRepository.existsByUsername(memberdto.getUsername())){
            throw new IllegalAccessError("해당 유저이름은 현재 존재합니다.");
        }

        Member member = MemberDto.toEntity(memberdto);
        memberRepository.save(member);

        return MemberDto.from(member);
    }


}
