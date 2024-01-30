package com.tadak.userservice.global.oauth;

import com.tadak.userservice.domain.member.entity.Member;
import com.tadak.userservice.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("loadUser 실행");
        OAuth2UserService<OAuth2UserRequest, OAuth2User> service = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = service.loadUser(userRequest); // OAuth2 정보 가져오기

        Map<String, Object> originAttributes = oAuth2User.getAttributes();

        String socialName = userRequest.getClientRegistration().getRegistrationId(); // 소셜 정보 가져오기
        log.info("socialName = {}", socialName);

        OAuthAttributes attributes = OAuthAttributes.of(socialName, originAttributes);
        Member member = getOrCreate(attributes); // get Or create
        String email = member.getEmail();

        // 권한 저장
        List<GrantedAuthority> authorities = getGrantedAuthorities(member);

        return new OAuth2CustomMember(socialName, originAttributes, authorities, email);
    }

    private Member getOrCreate(OAuthAttributes attributes){
        Optional<Member> existingMember = memberRepository.findByEmail(attributes.getEmail());

        if (existingMember.isPresent()) {
            return existingMember.get();
        }

        Member newMember = attributes.toEntity();
        return memberRepository.save(newMember);

    }

    private List<GrantedAuthority> getGrantedAuthorities(Member member) {
        return Collections.singletonList(
                new SimpleGrantedAuthority(member.getRole().name())
        );
    }
}
