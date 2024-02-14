package com.tadak.chatroomservice.domain.chatroom.dto.response;

import com.tadak.chatroomservice.domain.chatmember.entity.ChatMember;
import com.tadak.chatroomservice.domain.chatmember.entity.ChatMemberType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class KickMemberResponse {

    private String username;
    private ChatMemberType type;

    public static KickMemberResponse from(ChatMember chatMember){
        return KickMemberResponse.builder()
                .username(chatMember.getUsername())
                .type(chatMember.getType())
                .build();
    }
}
