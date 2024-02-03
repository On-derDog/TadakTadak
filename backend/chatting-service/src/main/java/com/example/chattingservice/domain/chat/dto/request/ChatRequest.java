package com.example.chattingservice.domain.chat.dto.request;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatRequest {
    private String content;
    private String sender;
    private MessageType type;
    private LocalDateTime createdAt;
}