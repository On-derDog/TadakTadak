package com.tadak.userservice.global.oauth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tadak.userservice.domain.member.dto.response.TokenResponseDto;
import com.tadak.userservice.domain.member.entity.Member;
import com.tadak.userservice.domain.member.exception.NotFoundMemberException;
import com.tadak.userservice.domain.member.repository.MemberRepository;
import com.tadak.userservice.global.error.ErrorCode;
import com.tadak.userservice.global.jwt.filter.JwtFilter;
import com.tadak.userservice.global.jwt.provider.TokenProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final TokenProvider tokenProvider;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("onAuthenticationSuccess 실행");
        OAuth2CustomMember oAuth2User = (OAuth2CustomMember) authentication.getPrincipal();
        String email = oAuth2User.getName();

        memberRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundMemberException(ErrorCode.NOT_FOUND_MEMBER_ERROR));

        String accessToken = tokenProvider.createAccessToken(authentication);
        String refreshToken = tokenProvider.createRefreshToken(authentication);

        TokenResponseDto tokenResponseDto = tokenProvider.createTokenResponseDto(accessToken, refreshToken);

        createResponseHeader(response, tokenResponseDto);

        response.sendRedirect("http://localhost:5173");
    }

    private void createResponseHeader(HttpServletResponse response, TokenResponseDto tokenResponseDto) throws IOException {
        response.addHeader(JwtFilter.ACCESS_AUTHORIZATION_HEADER, "Bearer " + tokenResponseDto.getAccessToken());
        response.addHeader(JwtFilter.REFRESH_AUTHORIZATION_HEADER, "Bearer " + tokenResponseDto.getRefreshToken());
    }

    private List<GrantedAuthority> getGrantedAuthorities(Member member) {
        return Collections.singletonList(
                new SimpleGrantedAuthority(member.getRole().name())
        );
    }
}