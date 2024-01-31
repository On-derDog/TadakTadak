package com.tadak.userservice.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CheckEmailResponseDto {

    private boolean isValid;
    private LocalDateTime expireAt;

    public static CheckEmailResponseDto of(boolean isValid, LocalDateTime expireAt){
        return CheckEmailResponseDto.builder()
                .isValid(isValid)
                .expireAt(expireAt)
                .build();
    }
}
