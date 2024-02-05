package com.tadak.signaling.server.service;

import com.tadak.signaling.server.domain.WebSocketMessage;
import com.tadak.signaling.server.dto.ChatroomDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class RtcService {
    private final int MINIMUM_USER_COUNT_TO_START = 1;
    // 여기에 Repository 설정 가능

    public Map<String, WebSocketSession> getClients(ChatroomDto room){
        return room.getClients();
    }
    public Map<String,WebSocketSession> addClients(ChatroomDto room,String userId,WebSocketSession session){
        Map<String,WebSocketSession> users = room.getClients();
        users.put(userId,session);
        return users;
    }
    public void removeClient(ChatroomDto room,String userId){
        room.getClients().remove(userId);
    }
    public boolean isUserCountMoreThan(ChatroomDto room){
        return room.getClients().size()>1;
    }
}
