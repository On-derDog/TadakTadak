package com.tadak.userservice.domain.email.dto;

import com.tadak.userservice.domain.member.dto.response.DuplicateCheckResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmailResponseDto {

    private boolean emailVerified;

    public static EmailResponseDto of(boolean emailVerified){
        return EmailResponseDto.builder()
                .emailVerified(emailVerified)
                .build();
    }
}
