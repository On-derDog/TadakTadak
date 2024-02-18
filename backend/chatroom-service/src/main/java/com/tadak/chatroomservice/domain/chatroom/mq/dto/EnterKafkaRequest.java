package com.tadak.chatroomservice.domain.chatroom.mq.dto;

import com.tadak.chatroomservice.domain.chatmember.dto.response.EnterChatMemberResponse;
import com.tadak.chatroomservice.domain.chatroom.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EnterKafkaRequest {

    private String roomName;
    private String username;
    private String status;

    public static EnterKafkaRequest from(ChatRoom chatRoom, String username){
        return EnterKafkaRequest.builder()
                .roomName(chatRoom.getRoomName())
                .username(username)
                .status("enter")
                .build();
    }
}
