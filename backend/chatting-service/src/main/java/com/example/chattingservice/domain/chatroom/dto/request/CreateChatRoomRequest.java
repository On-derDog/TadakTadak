package com.example.chattingservice.domain.chatroom.dto.request;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateChatRoomRequest {
    private String title;
    private String description;
    private String category;
    private Long participantsLimit;
}
