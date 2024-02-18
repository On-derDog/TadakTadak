package com.example.chattingservice.domain.chat.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserParticipation {
    private String username;
    private String roomName;
    private Long userId;
    private String status;

    public void changeRoomName(String newRoomName){
        this.roomName = newRoomName;
    }
}
