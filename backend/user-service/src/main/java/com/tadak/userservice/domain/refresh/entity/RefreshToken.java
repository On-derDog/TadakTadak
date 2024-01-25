package com.tadak.userservice.domain.refresh.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshToken {

    //TODO : Key 정보를 email하기

    @Id
    private String email;
    private String refreshToken;
}
