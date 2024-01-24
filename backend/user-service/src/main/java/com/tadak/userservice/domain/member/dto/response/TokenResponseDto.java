package com.tadak.userservice.domain.member.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenResponseDto {
    @JsonIgnore
    private String grantType; // bearer 사용
    @JsonIgnore
    private String accessToken;
    @JsonIgnore
    private String refreshToken;
    @CreatedDate
    private LocalDateTime createAt; // 토큰 발급 시간
}
