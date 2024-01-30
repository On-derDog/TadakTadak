package com.tadak.userservice.domain.member.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequestDto {

    @NotNull
    @Email
    private String email;

    @NotNull
    @Size(min = 3, max = 100)
    private String password;
}
