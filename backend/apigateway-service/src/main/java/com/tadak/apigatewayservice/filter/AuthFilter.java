package com.tadak.apigatewayservice.filter;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.security.Key;

@Slf4j
@Component
public class AuthFilter extends AbstractGatewayFilterFactory<AuthFilter.Config> {

    private final String secret;
    public static final String ACCESS_AUTHORIZATION_HEADER = "Accesstoken";
    public static final String REFRESH_AUTHORIZATION_HEADER = "Refreshtoken";
    private Key key;


    public AuthFilter(@Value("${jwt.secret}") String secret){
        super(Config.class);
        this.secret = secret;
    }

    @PostConstruct
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (exchange, chain) -> {
            ServerHttpRequest request = exchange.getRequest();

            String accessToken = request.getHeaders().get(ACCESS_AUTHORIZATION_HEADER).get(0);
            log.info("accessToken = {}", accessToken);

            if (StringUtils.hasText(accessToken) && isJwtValid(accessToken)) {
                return chain.filter(exchange);
            }

            String refreshToken = request.getHeaders().get(REFRESH_AUTHORIZATION_HEADER).get(0);

            if (refreshToken != null && isJwtValid(refreshToken)) {
                return chain.filter(exchange);
            }

            return onError(exchange, "토큰이 유효하지 않습니다.", HttpStatus.UNAUTHORIZED);
        };
    }

    private Mono<Void> onError(ServerWebExchange exchange, String error, HttpStatus httpStatus) {
        ServerHttpResponse response = exchange.getResponse();
        response.setStatusCode(httpStatus);

        log.error(error);
        return response.setComplete();
    }

    private boolean isJwtValid(String token) {
        boolean returnValue = true;

        if (StringUtils.hasText(token) && token.startsWith("Bearer ")){
            token = token.substring(7);
        }

        log.info("token = {}", token);

        String subject = null;

        try{
            subject = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build().parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        }catch (Exception e){
            returnValue = false;
        }

        if (subject == null || subject.isEmpty()){
            returnValue = false;
        }

        return returnValue;
    }

    public static class Config {

    }
}
