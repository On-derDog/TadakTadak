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

    // token 정보를 responseBody에 포함하지 않기로하였음
    @JsonIgnore
    private String grantType; // bearer 사용
    @JsonIgnore
    private String accessToken;
    @JsonIgnore
    private String refreshToken;
    private LocalDateTime tokenCreateAt;
}
