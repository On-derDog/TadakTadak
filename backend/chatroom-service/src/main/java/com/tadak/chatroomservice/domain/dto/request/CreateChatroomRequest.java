package com.tadak.chatroomservice.domain.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateChatroomRequest {

    private String roomName;
    private String description;
    private String owner;
    private String category;
    private Integer capacity;
}
