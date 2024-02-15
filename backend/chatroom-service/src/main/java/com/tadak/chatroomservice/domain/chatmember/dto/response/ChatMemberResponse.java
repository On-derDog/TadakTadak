package com.tadak.chatroomservice.domain.chatmember.dto.response;

import com.tadak.chatroomservice.domain.chatmember.entity.ChatMember;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatMemberResponse {

    private String username;

    public static ChatMemberResponse from(ChatMember chatMember){
        return ChatMemberResponse.builder()
                .username(chatMember.getUsername())
                .build();
    }
}
