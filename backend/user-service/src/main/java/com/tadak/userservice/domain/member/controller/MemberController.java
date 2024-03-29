package com.tadak.userservice.domain.member.controller;

import com.tadak.userservice.domain.member.dto.request.LoginRequestDto;
import com.tadak.userservice.domain.member.dto.request.SignupRequestDto;
import com.tadak.userservice.domain.member.dto.response.*;
import com.tadak.userservice.domain.member.service.MemberService;
import com.tadak.userservice.global.jwt.filter.JwtFilter;
import jakarta.mail.MessagingException;
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
public class MemberController {

    private final MemberService memberService;

    /**
     * 권한 체크
     */
    @GetMapping("/hello")
    @PreAuthorize("isAuthenticated()")
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
    public ResponseEntity<TokenResponseDto> login(@Valid @RequestBody LoginRequestDto loginRequestDto) {
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

    /**
     * username 검증
     */
    @GetMapping("/signup/exists-username/{username}")
    public ResponseEntity<DuplicateCheckResponseDto> checkUsername(@PathVariable("username") String username){
        DuplicateCheckResponseDto duplicateCheckResponseDto = memberService.existsUsername(username);
        return ResponseEntity.status(HttpStatus.OK).body(duplicateCheckResponseDto);
    }

    /**
     * email 인증 & 검증
     */
    @GetMapping("/signup/exists-email/{email}")
    public ResponseEntity<CheckEmailResponseDto> checkEmail(@PathVariable("email") String email) throws MessagingException {
        CheckEmailResponseDto checkEmailResponseDto = memberService.existsEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(checkEmailResponseDto);
    }

    /**
     * member 정보 조회
     */
    @GetMapping("/user-info")
    public ResponseEntity<MemberResponseDto> userInfo(@RequestHeader(JwtFilter.ACCESS_AUTHORIZATION_HEADER) String token){
        MemberResponseDto member = memberService.findByMember(token);
        return ResponseEntity.status(HttpStatus.OK).body(member);
    }
}
