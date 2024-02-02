package com.example.chattingservice.domain.chat.dto.response;

import com.example.chattingservice.domain.chat.dto.request.ChatRequest;
import com.example.chattingservice.domain.chat.dto.request.MessageType;
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

    public static ChatResponse from(ChatRequest chatRequest) {
        LocalDateTime now = LocalDateTime.now();

        return ChatResponse.builder()
                .content(chatRequest.getContent())
                .sender(chatRequest.getSender())
                .type(chatRequest.getType())
                .createdAt(now)
                .build();
    }

    public static ChatResponse from(ChatRequest chatRequest, LocalDateTime createdAt) {
        return ChatResponse.builder()
                .content(chatRequest.getContent())
                .sender(chatRequest.getSender())
                .type(chatRequest.getType())
                .createdAt(createdAt)
                .build();
    }
}