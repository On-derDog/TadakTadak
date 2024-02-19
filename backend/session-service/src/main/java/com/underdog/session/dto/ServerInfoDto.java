package com.underdog.session.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class ServerInfoDto {
    private int port;
}
