package com.tadak.chatroomservice.domain.dto.response;

import com.tadak.chatroomservice.domain.entity.ChatRoom;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateChatroomResponse {

    private Long id;
    private String roomName;
    private String description;
    private String owner;
    private String category;
    private Integer participation;
    private Integer capacity;

    public static CreateChatroomResponse of(ChatRoom chatRoom) {
        return CreateChatroomResponse.builder()
                .id(chatRoom.getId())
                .roomName(chatRoom.getRoomName())
                .description(chatRoom.getDescription())
                .owner(chatRoom.getOwner())
                .category(chatRoom.getCategory())
                .participation(chatRoom.getParticipation())
                .capacity(chatRoom.getCapacity())
                .build();
    }
}
