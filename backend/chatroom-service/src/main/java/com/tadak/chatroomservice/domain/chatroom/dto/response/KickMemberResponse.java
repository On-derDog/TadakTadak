package com.tadak.chatroomservice.domain.chatroom.dto.response;

import com.tadak.chatroomservice.domain.chatmember.entity.ChatMember;
import com.tadak.chatroomservice.domain.chatmember.entity.ChatMemberType;
import com.tadak.chatroomservice.domain.chatroom.entity.ChatRoom;
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
    private Long chatRoomId;
    private Integer participation;

    public static KickMemberResponse of(ChatMember chatMember, ChatRoom chatRoom){
        return KickMemberResponse.builder()
                .username(chatMember.getUsername())
                .type(chatMember.getType())
                .chatRoomId(chatRoom.getId())
                .participation(chatRoom.getParticipation())
                .build();
    }
}
