package com.example.chattingservice.domain.chatroom.exception;

public class NoChatRoomException extends RuntimeException {
    public NoChatRoomException(String message) {
        super(message);
    }
}