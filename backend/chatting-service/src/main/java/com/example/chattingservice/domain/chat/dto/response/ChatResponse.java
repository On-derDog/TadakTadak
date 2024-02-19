package com.example.chattingservice.domain.chat.dto.response;

import com.example.chattingservice.domain.chat.dto.request.MessageType;
import com.example.chattingservice.domain.chat.entity.Chat;
import java.time.LocalDateTime;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatResponse {
    private String content;
    private String username;
    private MessageType type;
    private LocalDateTime createdAt;
    private Long roomId;

    public static ChatResponse from(Chat chatEntity) {
        MessageType type = MessageType.CHAT;

        return ChatResponse.builder()
                .content(chatEntity.getContent())
                .username(chatEntity.getSender())
                .type(type)
                .roomId(chatEntity.getRoomId())
                .createdAt(chatEntity.getCreatedAt())
                .build();
    }
    public static ChatResponse fromObject(JsonNode object){
        return ChatResponse.builder()
                .roomId(object.get("roomId").asLong())
                .username(object.get("username").asText())
                .type(MessageType.CHAT)
                .content(object.get("content").asText())
                .createdAt(LocalDateTime.parse(object.get("createdAt").asText()))
                .build();
    }
}