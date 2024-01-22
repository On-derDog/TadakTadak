package com.tadak.userservice.domain.member.controller;

import com.tadak.userservice.domain.member.dto.request.LoginRequestDto;
import com.tadak.userservice.domain.member.dto.request.SignupRequestDto;
import com.tadak.userservice.domain.member.dto.response.SignupResponseDto;
import com.tadak.userservice.domain.member.dto.response.TokenResponseDto;
import com.tadak.userservice.domain.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-service")
@Slf4j
public class UserController {

    private final MemberService memberService;

    @GetMapping("/hello")
    public String hello() {
        return "hello";
    }

    /**
     * 회원 가입
     */
    @PostMapping("/signup")
    public ResponseEntity<SignupResponseDto> signup(@Valid @RequestBody SignupRequestDto signupRequestDto) {
        SignupResponseDto result = memberService.signup(signupRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    /**
     * 로그인
     */
    @PostMapping("/login")
    public ResponseEntity<Void> authorize(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        memberService.login(loginRequestDto);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
