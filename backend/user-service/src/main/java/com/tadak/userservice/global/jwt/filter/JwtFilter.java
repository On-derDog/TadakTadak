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
    public static final String ACCESS_AUTHORIZATION_HEADER = "Accesstoken";
    public static final String REFRESH_AUTHORIZATION_HEADER = "Refreshtoken";
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
        // accessToken이 만료되었거나 accessToken값이 없을 경우 refresh Token으로 재발급 받기
        else if (!tokenProvider.validateToken(accessToken) && refreshToken != null){
            boolean refreshTokenValid = tokenProvider.validateToken(refreshToken);
            if (refreshTokenValid){
                Authentication authMember = tokenProvider.getAuthentication(refreshToken); // authentication으로 Member email가져오기
                String valueRefreshToken = tokenProvider.getAuthoritiesKey(authMember.getName()); // redis에 저장된 refreshToken 값
                if (valueRefreshToken.equals(refreshToken)){ // 현재 받은 refreshToken이랑 redis에 저장된 refreshToken 값 비교
                    Authentication authentication = tokenProvider.getAuthentication(refreshToken);
                    String reAccessToken = tokenProvider.createAccessToken(authentication);
                    String reRefreshToken = tokenProvider.createRefreshToken(authentication);
                    HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;
                    httpServletResponse.addHeader(ACCESS_AUTHORIZATION_HEADER, "Bearer " + reAccessToken);
                    httpServletResponse.addHeader(REFRESH_AUTHORIZATION_HEADER, "Bearer " + reRefreshToken);
                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    tokenProvider.saveRefreshToken(reRefreshToken, authentication.getName()); // 새로 발급받은 refreshToken 저장
                    log.info("ReAccessToken Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
                }
            }
        }
        else {
            log.info("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
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
