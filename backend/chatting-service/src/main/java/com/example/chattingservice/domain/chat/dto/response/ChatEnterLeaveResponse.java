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
public class ChatEnterLeaveResponse {
    private String sender;
    private MessageType type;
    private LocalDateTime createdAt;

    public static ChatEnterLeaveResponse of(ChatRequest chatRequest, LocalDateTime createdAt) {
        return ChatEnterLeaveResponse.builder()
                .sender(chatRequest.getSender())
                .type(chatRequest.getType())
                .createdAt(createdAt)
                .build();
    }
}
