package com.tadak.chatroomservice.domain.chatroom.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EnterChatRoomRequest {

    private String username;
}
