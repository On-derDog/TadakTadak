package com.tadak.userservice.global.oauth;

import com.tadak.userservice.domain.member.entity.Member;
import com.tadak.userservice.domain.member.entity.Role;
import com.tadak.userservice.domain.member.entity.State;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Getter
@ToString
@AllArgsConstructor
@Builder
public class OAuthAttributes {

    private Map<String, Object> attributes;
    private String nameAttributesKey;
    private String name;
    private String email;

    public static OAuthAttributes of(String socialName, Map<String, Object> attributes){
        if ("naver".equalsIgnoreCase(socialName)){
            return ofNaver("id", attributes);
        }

        throw new IllegalArgumentException("잘못된 소셜 정보입니다.");
    }

    private static OAuthAttributes ofNaver(String id, Map<String, Object> attributes) {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        return OAuthAttributes.builder()
                .name(String.valueOf(response.get("nickname")))
                .email(String.valueOf(response.get("email")))
                .attributes(response)
                .nameAttributesKey(id)
                .build();
    }

    public Member toEntity() {
        return Member.builder()
                .username(name)
                .email(email)
                .state(State.ACTIVE)
                .role(Role.ROLE_USER)
                .build();
    }
}