package com.tadak.chatroomservice.domain.chatroom.dto.response;

import com.tadak.chatroomservice.domain.chatmember.dto.response.ChatMemberResponse;
import com.tadak.chatroomservice.domain.chatroom.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OneChatRoomResponse {

    private String roomName;
    private Integer participation;
    private String owner;
    private List<ChatMemberResponse> chatMemberResponses;

    public static OneChatRoomResponse of(ChatRoom chatRoom, List<ChatMemberResponse> chatMemberResponses){
        return OneChatRoomResponse.builder()
                .roomName(chatRoom.getRoomName())
                .participation(chatRoom.getParticipation())
                .owner(chatRoom.getOwner())
                .chatMemberResponses(chatMemberResponses)
                .build();
    }
}
