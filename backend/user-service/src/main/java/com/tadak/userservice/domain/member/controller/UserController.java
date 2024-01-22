package com.tadak.userservice.domain.member.controller;

import com.tadak.userservice.domain.member.dto.request.MemberDto;
import com.tadak.userservice.domain.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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

    @PostMapping("/signup")
    public ResponseEntity<MemberDto> signup(@Valid @RequestBody MemberDto memberdto) {
        MemberDto member = memberService.signup(memberdto);
        return ResponseEntity.ok(member);
    }
}
