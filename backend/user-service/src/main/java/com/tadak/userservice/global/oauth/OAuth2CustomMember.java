package com.tadak.userservice.global.oauth;

import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Map;

@AllArgsConstructor
public class OAuth2CustomMember implements OAuth2User, Serializable {
    private String email;
    private Map<String, Object> attributes;
    private List<GrantedAuthority> authorities;

    @Override
    public Map<String, Object> getAttributes() {
        return this.attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getName() {
        return this.email;
    }
}