package com.underdog.session.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

import javax.annotation.processing.Generated;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class OnlineUser {
    @Id @GeneratedValue
    private Long id;

    private String username;
    private String roomName;

    public void setRoomName(String newRoomName){
        this.roomName = newRoomName;
    }
}
