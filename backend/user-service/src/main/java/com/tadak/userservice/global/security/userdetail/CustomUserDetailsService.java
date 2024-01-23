package com.tadak.userservice.global.security.userdetail;

import com.tadak.userservice.domain.member.entity.Member;
import com.tadak.userservice.domain.member.entity.Role;
import com.tadak.userservice.domain.member.entity.State;
import com.tadak.userservice.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Collections;

@RequiredArgsConstructor
@Component
@Slf4j
@Transactional
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return memberRepository.findByEmail(email)
                .map(user -> createMember(email, user))
                .orElseThrow(() -> new UsernameNotFoundException(email + " -> 데이터베이스에서 찾을 수 없습니다."));
    }

    private UserDetails createMember(String username, Member member) {
        if (!member.getState().equals(State.ACTIVE)) {
            throw new RuntimeException(username + " -> 활성화되어 있지 않습니다.");
        }

//        List<GrantedAuthority> grantedAuthorities = member.getMemberAuthorities().stream()
//                .map(authority -> new SimpleGrantedAuthority(authority.getAuthority().getAuthorityType()))
//                .collect(Collectors.toList());

        Collection<? extends GrantedAuthority> authorities = getGrantedAuthorities(member);

        for (GrantedAuthority authority : authorities) {
            log.info("authority = {}", authority);
        }

        return new User(member.getEmail(),
                member.getPassword(),
                authorities);
    }

    private static Collection<? extends GrantedAuthority> getGrantedAuthorities(Member member) {
        log.info("member getRole = {}", member.getRole().name());
        return Collections.singleton(
//                new SimpleGrantedAuthority("ROLE_" + member.getRole().name())
                new SimpleGrantedAuthority(member.getRole().name())
        );
    }
}
