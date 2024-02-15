package com.tadak.chatroomservice.domain.chatroom.dto.response;

import com.tadak.chatroomservice.domain.chatmember.dto.response.EnterChatMemberResponse;
import com.tadak.chatroomservice.domain.chatroom.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CreateChatroomResponse {

    private Long id;
    private String roomName;
    private String description;
    private String owner;
    private String hashtag;
    private Integer participation;
    private Integer capacity;
    private EnterChatMemberResponse chatMemberResponse;

    public static CreateChatroomResponse of(ChatRoom chatRoom, EnterChatMemberResponse chatMemberResponse) {

        return CreateChatroomResponse.builder()
                .id(chatRoom.getId())
                .roomName(chatRoom.getRoomName())
                .description(chatRoom.getDescription())
                .owner(chatRoom.getOwner())
                .hashtag(chatRoom.getHashtag())
                .participation(chatRoom.getParticipation())
                .capacity(chatRoom.getCapacity())
                .chatMemberResponse(chatMemberResponse)
                .build();
    }
}
