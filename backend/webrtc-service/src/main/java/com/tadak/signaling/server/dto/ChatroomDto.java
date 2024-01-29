package com.tadak.signaling.server.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;

@Getter
@Builder
public class ChatroomDto {
    private String roomId; //채팅방 아이디
    //session = clients로
    private Map<String, WebSocketSession> clients;
}
