package com.tadak.chatroomservice.domain.chatroom.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateChatroomRequest {

    private String roomName;
    private String description;
    private String owner;
    private String category;
    private Integer capacity;
}
