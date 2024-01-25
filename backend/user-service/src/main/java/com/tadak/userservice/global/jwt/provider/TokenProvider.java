package com.tadak.userservice.global.jwt.provider;

import com.tadak.userservice.domain.member.dto.response.TokenResponseDto;
import com.tadak.userservice.global.security.userdetail.CustomUserDetailsService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
@Slf4j
public class TokenProvider implements InitializingBean {
    private static final String AUTHORITIES_KEY = "auth";
    private final String secret;
    private final long accessTokenValidationTime;
    private final long refreshTokenValidationTime;
    private Key key;
    private final CustomUserDetailsService customUserDetailsService;

    public TokenProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.access-validity-in-seconds}") long accessTokenValidationTime,
            @Value("${jwt.refresh-validity-in-seconds}") long refreshTokenValidationTime,
            CustomUserDetailsService customUserDetailsService) {
        this.secret = secret;
        this.accessTokenValidationTime = accessTokenValidationTime;
        this.refreshTokenValidationTime = refreshTokenValidationTime;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    // AccessToken 생성 메서드
    public String createAccessToken(Authentication authentication) {
        long now = System.currentTimeMillis();
        long validityMillis = this.accessTokenValidationTime * 1000;

        Date validity = new Date(now + validityMillis);

        return generateToken(authentication, validity);
    }

    // RefreshToken 생성 메서드
    public String createRefreshToken(Authentication authentication) {
        long now = System.currentTimeMillis();
        long refreshValidityMillis = this.refreshTokenValidationTime * 1000;

        Date refreshValidity = new Date(now + refreshValidityMillis);

        // Refresh 토큰 생성
        return generateToken(authentication, refreshValidity);
    }

    // 토큰을 생성하는 공통 메서드
    private String generateToken(Authentication authentication, Date expiration) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        log.info("authorities = {}", authorities);

        Claims claims = Jwts.claims()
                .setSubject(authentication.getName());

        return Jwts.builder()
                .setClaims(claims)
                .claim(AUTHORITIES_KEY, authorities)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(expiration)
                .compact();
    }

    public TokenResponseDto createTokenResponseDto(String accessToken, String refreshToken) {
        return TokenResponseDto.builder()
                .grantType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        // claims auth 체크 부분!
        if (claims.get(AUTHORITIES_KEY) == null){
            throw new IllegalStateException("Token Provider 권한 정보가 없는 토큰입니다!.");
        }

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new).toList();

//        UserDetails userDetails = customUserDetailsService.loadUserByUsername(claims.getSubject());
//        return new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities());

        User principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    /**
     * 토큰 정보 가져오기
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            log.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            log.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            log.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            log.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }
}
