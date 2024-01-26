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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-service")
@Slf4j
public class UserController {

    private final MemberService memberService;

    /**
     * 권한 체크
     */
    @GetMapping("/hello")
    @PreAuthorize("isAuthenticated()")
//    @PreAuthorize("hasAnyRole('ROLE_USER')")
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
    public ResponseEntity<TokenResponseDto> authorize(@Valid @RequestBody LoginRequestDto loginRequestDto) {
        return memberService.login(loginRequestDto);
    }

    /**
     * 료그아웃
     */
    @PostMapping("/logout/{email}")
    public ResponseEntity<Void> logout(@PathVariable("email") String email, Authentication authentication){
        memberService.logout(email, authentication.getName());
        log.info("loginEmail = {}", authentication.getName());
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
