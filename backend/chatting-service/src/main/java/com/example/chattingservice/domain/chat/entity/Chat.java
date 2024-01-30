package com.example.chattingservice.domain.chat.entity;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
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
}
