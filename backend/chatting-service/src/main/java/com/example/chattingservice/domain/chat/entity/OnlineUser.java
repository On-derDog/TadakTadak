package com.example.chattingservice.domain.chat.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;

@Entity
@Getter
public class OnlineUser {

    @Id
    private Long id;
    private String username;
    private String roomName;
}
