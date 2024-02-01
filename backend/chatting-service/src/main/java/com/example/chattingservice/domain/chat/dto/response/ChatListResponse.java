package com.example.chattingservice.domain.chat.dto.response;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ChatListResponse {
    private List<ChatsResponse> chatList;
    private boolean hasNext;

    public static ChatListResponse from(List<ChatsResponse> chats, boolean hasNext) {
        return ChatListResponse.builder()
                .chatList(chats)
                .hasNext(hasNext)
                .build();
    }
}
