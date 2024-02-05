package com.example.chattingservice.domain.chat.dto.response;

import com.example.chattingservice.domain.chat.dto.request.MessageType;
import com.example.chattingservice.domain.chat.entity.Chat;
import java.time.LocalDateTime;
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
    private String sender;
    private MessageType type;
    private LocalDateTime createdAt;

    public static ChatResponse from(Chat chatEntity) {
        MessageType type = MessageType.CHAT;

        return ChatResponse.builder()
                .content(chatEntity.getContent())
                .sender(chatEntity.getSender())
                .type(type)
                .createdAt(chatEntity.getCreatedAt())
                .build();
    }
}