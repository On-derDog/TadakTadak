package com.example.chattingservice.domain.chat.dto.request;


import lombok.Getter;

@Getter
public class KafkaEnterChatRoomDto {
    private String roomName;
    private String username;
}
