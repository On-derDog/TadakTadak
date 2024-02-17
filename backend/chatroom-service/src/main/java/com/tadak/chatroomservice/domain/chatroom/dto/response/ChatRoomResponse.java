package com.tadak.chatroomservice.domain.chatroom.dto.response;

import com.tadak.chatroomservice.domain.chatroom.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomResponse {

    private Long roomId;
    private String roomName;
    private String description;
    private String hashtag;
    private Integer participation;
    private Integer capacity;
    private String owner;

    public static ChatRoomResponse from(ChatRoom chatRoom) {
        return ChatRoomResponse.builder()
                .roomId(chatRoom.getId())
                .roomName(chatRoom.getRoomName())
                .description(chatRoom.getDescription())
                .hashtag(chatRoom.getHashtag())
                .participation(chatRoom.getParticipation())
                .capacity(chatRoom.getCapacity())
                .owner(chatRoom.getOwner())
                .build();
    }
}
