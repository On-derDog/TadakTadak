package com.example.chattingservice.domain.chat.dto.response;

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
public class ChatsResponse {
    private String _id;
    private String content;
    private String sender;
    private LocalDateTime createdAt;

    public static ChatsResponse from(Chat chat) {

        return ChatsResponse.builder()
                ._id(chat.get_id())
                .content(chat.getContent())
                .sender(chat.getSender())
                .createdAt(chat.getCreatedAt())
                .build();
    }
}
