package com.tadak.userservice.domain.member.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tadak.userservice.domain.member.entity.Member;
import com.tadak.userservice.domain.member.entity.Role;
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

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignupRequestDto {

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

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    @Size(min = 3, max = 100)
    private String passwordConfirm;

    @Enumerated(EnumType.STRING)
    private State state;

}
