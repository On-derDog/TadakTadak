package com.tadak.userservice.domain.member.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tadak.userservice.domain.member.entity.Member;
import com.tadak.userservice.domain.member.entity.State;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {

    @NotNull
    @Size(min = 3, max = 50)
    private String username;

    @NotNull
    @Email
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    @Size(min = 3, max = 100)
    private String password;

    @Enumerated(EnumType.STRING)
    private State state;

    // MemberDto -> Member
    public static Member toEntity(MemberDto memberDto){
        return Member.builder()
                .email(memberDto.getEmail())
                .username(memberDto.getUsername())
                .password(memberDto.getPassword())
                .state(State.ACTIVE)
                .build();
    }

    // Member -> MemberDto
    public static MemberDto from(Member member){
        if (member == null){
            return null;
        }

        return MemberDto.builder()
                .username(member.getUsername())
                .email(member.getEmail())
                .state(member.getState())
                .build();
    }
}
