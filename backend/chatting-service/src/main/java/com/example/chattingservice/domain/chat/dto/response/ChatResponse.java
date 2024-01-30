package com.example.chattingservice.domain.chat.dto.response;

import com.example.chattingservice.domain.chat.dto.request.ChatRequest;
import com.example.chattingservice.domain.chat.dto.request.MessageType;
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

    public static ChatResponse from(ChatRequest chatRequest) {
        return ChatResponse.builder()
                .content(chatRequest.getContent())
                .sender(chatRequest.getSender())
                .type(chatRequest.getType())
                .build();
    }
}