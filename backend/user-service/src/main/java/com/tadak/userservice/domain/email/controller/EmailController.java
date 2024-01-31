package com.tadak.userservice.domain.email.controller;

import com.tadak.userservice.domain.email.dto.EmailRequestDto;
import com.tadak.userservice.domain.email.dto.EmailResponseDto;
import com.tadak.userservice.domain.email.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user-service")
public class EmailController {

    private final EmailService emailService;

    @PostMapping("/authcode/{email}")
    public ResponseEntity<EmailResponseDto> verifyEmailCode(@PathVariable("email") String email, @RequestBody EmailRequestDto dto) {
        EmailResponseDto emailResponseDto = emailService.verifyEmailCode(email, dto.getCode());

        if (emailResponseDto.isEmailVerified()){
            return ResponseEntity.status(HttpStatus.OK).body(emailResponseDto);
        }

        return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(emailResponseDto);
    }
}
