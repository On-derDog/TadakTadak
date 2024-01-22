package com.tadak.userservice.domain.member.dto.response;

import com.tadak.userservice.domain.member.entity.Member;
import com.tadak.userservice.domain.member.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupResponseDto {

    private Long id;
    private String email;
    private String username;
    private Role role;

    // Member -> SignupResponse
    public static SignupResponseDto from(Member member) {
        if (member == null){
            return null;
        }

        return SignupResponseDto.builder()
                .id(member.getId())
                .username(member.getUsername())
                .email(member.getEmail())
                .role(member.getRole())
                .build();
    }
}
