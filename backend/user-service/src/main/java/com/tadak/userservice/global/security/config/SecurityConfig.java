package com.tadak.userservice.global.security.config;

import com.tadak.userservice.global.jwt.config.JwtSecurityConfig;
import com.tadak.userservice.global.jwt.handler.JwtAccessDeniedHandler;
import com.tadak.userservice.global.jwt.handler.JwtAuthenticationEntryPoint;
import com.tadak.userservice.global.jwt.provider.TokenProvider;
import com.tadak.userservice.global.oauth.CustomOAuth2UserService;
import com.tadak.userservice.global.oauth.OAuth2MemberSuccessHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

@EnableWebSecurity
@EnableMethodSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final TokenProvider tokenProvider;
    private final CorsFilter corsFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2MemberSuccessHandler oAuth2MemberSuccessHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .csrf(AbstractHttpConfigurer::disable) // csrf disable
                .addFilterBefore(corsFilter, UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling(exceptionHandling -> exceptionHandling
                        .accessDeniedHandler(jwtAccessDeniedHandler)
                        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/user-service/signup/**").permitAll()
                        .requestMatchers("/user-service/login").permitAll()
                        .requestMatchers("/oauth2/**").permitAll()
                        .anyRequest().permitAll())
                // oauth 2.0 추가
                .oauth2Login(
                        oauth -> oauth
                                .userInfoEndpoint(config ->
                                        config.userService(customOAuth2UserService)) // 로그인할 때 사용하는 bean 정의
                                .successHandler(oAuth2MemberSuccessHandler)) // 로그인 로직 구현

                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // session 사용 x

                .headers(headers ->
                        headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
                )

                .apply(new JwtSecurityConfig(tokenProvider));

        return http.build();
    }
}
