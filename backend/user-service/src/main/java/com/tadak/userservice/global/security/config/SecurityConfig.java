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
                        .requestMatchers("/user-service/signup/**").permitAll() // 회원가입
                        .requestMatchers("/user-service/login").permitAll() // 로그인
                        .requestMatchers("/user-service/authcode/**").permitAll()
                        .requestMatchers("/oauth2/**").permitAll() // 네이버 로그인
                        .anyRequest().authenticated())
                .oauth2Login(
                        oauth -> oauth
                                .userInfoEndpoint(config ->
                                        config.userService(customOAuth2UserService))
                                .successHandler(oAuth2MemberSuccessHandler))

                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // session 사용 x

                .headers(headers ->
                        headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin)
                )

                .apply(new JwtSecurityConfig(tokenProvider));

        return http.build();
    }
}
