package com.tadak.userservice.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DuplicateCheckResponseDto {

    private boolean isValid;

    public static DuplicateCheckResponseDto of(boolean isValid){
        return DuplicateCheckResponseDto.builder()
                .isValid(isValid)
                .build();
    }
}
