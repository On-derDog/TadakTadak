package com.example.chattingservice.domain.chat.controller;

import com.example.chattingservice.domain.chat.dto.request.ChatRequest;
import com.example.chattingservice.domain.chat.dto.response.ChatResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
public class ChatController {

    @MessageMapping("/chat/{roomId}/send-message")
    @SendTo("/topic/public/{roomId}")
    public ChatResponse sendMessage(
            @Payload ChatRequest chatRequest,
            @DestinationVariable("roomId") Long roomId
    ) {

        ChatResponse chatResponse = ChatResponse.builder()
                .content(chatRequest.getContent())
                .sender(chatRequest.getSender())
                .type(chatRequest.getType())
                .build();

        return chatResponse;
    }

    @MessageMapping("/chat/{roomId}/enter")
    @SendTo("/topic/public/{roomId}")
    public ChatResponse enter(
            @Payload ChatRequest chatRequest,
            @DestinationVariable("roomId") Long roomId,
            SimpMessageHeaderAccessor headerAccessor
    ) {

        ChatResponse chatResponse = ChatResponse.builder()
                .content(chatRequest.getContent())
                .sender(chatRequest.getSender())
                .type(chatRequest.getType())
                .build();

        headerAccessor.getSessionAttributes().put("username", chatResponse.getSender());
        headerAccessor.getSessionAttributes().put("roomId", roomId);
        return chatResponse;
    }
}
