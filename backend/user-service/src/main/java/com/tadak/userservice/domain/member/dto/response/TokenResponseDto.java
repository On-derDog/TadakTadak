package com.tadak.userservice.domain.member.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenResponseDto {
    private String grantType; // bearer 사용
    private String accessToken;
    private String refreshToken;
}
