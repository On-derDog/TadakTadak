package com.tadak.userservice.global.jwt.filter;

import com.tadak.userservice.global.jwt.provider.TokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends GenericFilterBean {

    //    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String ACCESS_AUTHORIZATION_HEADER = "AccessToken";
    public static final String REFRESH_AUTHORIZATION_HEADER = "RefreshToken";
    private final TokenProvider tokenProvider;
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        String accessToken = resolveAccessToken(httpServletRequest);
        String refreshToken = resolveRefreshToken(httpServletRequest);

        String requestURI = httpServletRequest.getRequestURI();

        // accessToken이 만료되지 않았을 경우
        if (StringUtils.hasText(accessToken) && tokenProvider.validateToken(accessToken)) {
            Authentication authentication = tokenProvider.getAuthentication(accessToken);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
        }
        // accessToken이 만료되었을 경우 refresh Token으로 재발급 받기
        else if (!tokenProvider.validateToken(accessToken) && refreshToken != null){
            boolean refreshTokenValid = tokenProvider.validateToken(refreshToken);
            if (refreshTokenValid){
                Authentication authentication = tokenProvider.getAuthentication(refreshToken);
                String reAccessToken = tokenProvider.createToken(authentication).getAccessToken();
                HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
                httpServletResponse.addHeader(ACCESS_AUTHORIZATION_HEADER, "Bearer " + reAccessToken);
                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.info("ReAccessToken Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
            }
        }
        else {
            log.debug("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }
    private String resolveAccessToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(ACCESS_AUTHORIZATION_HEADER);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }

    private String resolveRefreshToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(REFRESH_AUTHORIZATION_HEADER);

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }
}