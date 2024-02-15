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
public class EnterChatMemberResponse {

    private Long chatMemberId;
    private Long chatRoomId;
    private String username;
    private Integer participation;

    public static EnterChatMemberResponse of(ChatMember chatMember, Integer participation){
        return EnterChatMemberResponse.builder()
                .chatMemberId(chatMember.getId())
                .chatRoomId(chatMember.getChatRoom().getId())
                .username(chatMember.getUsername())
                .participation(participation)
                .build();
    }
}
