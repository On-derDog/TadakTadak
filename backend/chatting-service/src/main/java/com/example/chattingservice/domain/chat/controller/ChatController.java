package com.example.chattingservice.domain.chat.controller;

import com.example.chattingservice.domain.chat.dto.request.ChatRequest;
import com.example.chattingservice.domain.chat.dto.response.ChatResponse;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @MessageMapping("/chat/send-message")
    @SendTo("/topic/public")
    public ChatResponse sendMessage(@Payload ChatRequest chatRequest) {

        ChatResponse chatResponse = ChatResponse.builder()
                .content(chatRequest.getContent())
                .sender(chatRequest.getSender())
                .type(chatRequest.getType())
                .build();

        return chatResponse;
    }

    @MessageMapping("/chat/add-user")
    @SendTo("/topic/public")
    public ChatResponse addUser(
            @Payload ChatRequest chatRequest,
            SimpMessageHeaderAccessor headerAccessor
    ) {
        ChatResponse chatResponse = ChatResponse.builder()
                .content(chatRequest.getContent())
                .sender(chatRequest.getSender())
                .type(chatRequest.getType())
                .build();

        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", chatResponse.getSender());
        return chatResponse;
    }
}
