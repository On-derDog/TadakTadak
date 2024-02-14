package com.tadak.chatroomservice.domain.chatroom.dto.response;

import com.tadak.chatroomservice.domain.chatroom.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChangeOwnerResponse {

    private Long chatRoomId;
    private String newOwner;

    public static ChangeOwnerResponse from(ChatRoom chatRoom){
        return ChangeOwnerResponse.builder()
                .chatRoomId(chatRoom.getId())
                .newOwner(chatRoom.getOwner())
                .build();
    }
}
