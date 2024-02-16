package com.example.chattingservice.global.config;

import com.example.chattingservice.domain.chat.dto.request.MessageType;
import com.example.chattingservice.domain.chat.dto.response.ChatResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final SimpMessageSendingOperations messageTemplate;

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String username = (String) headerAccessor.getSessionAttributes().get("username");
        Long roomId = (Long) headerAccessor.getSessionAttributes().get("roomId");

        if (username != null && roomId != null) {
            log.info("User disconnected: {} in room id {}", username, roomId);
            ChatResponse chatResponse = ChatResponse.builder()
                    .type(MessageType.LEAVE)
                    .username(username)
                    .build();

            messageTemplate.convertAndSend("/topic/public/" + roomId, chatResponse);
        }
    }
}
