package com.tadak.chatroomservice.domain.chatroom.dto.response;

import com.tadak.chatroomservice.domain.chatmember.dto.response.ChatMemberResponse;
import com.tadak.chatroomservice.domain.chatroom.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomNameResponse {

    private String roomName;

    public static ChatRoomNameResponse from(ChatRoom chatRoom){
        return ChatRoomNameResponse.builder()
                .roomName(chatRoom.getRoomName())
                .build();
    }
}
