package com.example.chattingservice.domain.chat.entity;

import com.example.chattingservice.domain.chat.dto.request.ChatRequest;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "ChatMessage")
public class Chat {
    @Id
    private String _id;
    private String content;
    private String sender;
    private Long roomId;

    private LocalDateTime createdAt;

    public static Chat toEntity(ChatRequest chatRequest, Long roomId) {
        return Chat.builder()
                .content(chatRequest.getContent())
                .sender(chatRequest.getSender())
                .roomId(roomId)
                .createdAt(LocalDateTime.now())
                .build();
    }
}
