package com.tadak.userservice.domain.refresh.repository;

import com.tadak.userservice.domain.refresh.entity.RefreshToken;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

@Repository
@Slf4j
@RequiredArgsConstructor
public class RefreshTokenRepository {

    private final RedisTemplate<String, String> redisTemplate;

    public void save(final RefreshToken refreshToken) {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(refreshToken.getEmail(), refreshToken.getRefreshToken());
        redisTemplate.expire(refreshToken.getEmail(), 60L * 60L * 24 * 7L, TimeUnit.SECONDS);
    }

    public String getValues(String email){
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        return valueOperations.get(email);
    }

    public boolean existsByEmail(String email){
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        String refreshToken = valueOperations.get(email);
        return refreshToken != null && !refreshToken.isEmpty();
    }

    public void deleteEmail(String email) {
        redisTemplate.delete(email);
    }
}
