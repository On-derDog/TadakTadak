package com.example.chattingservice.domain.chat.controller;

import com.example.chattingservice.domain.chat.dto.request.ChatRequest;
import com.example.chattingservice.domain.chat.dto.response.ChatListResponse;
import com.example.chattingservice.domain.chat.dto.response.ChatResponse;
import com.example.chattingservice.domain.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/chat/{roomId}/send-message")
    @SendTo("/topic/public/{roomId}")
    public ChatResponse sendMessage(
            @Payload ChatRequest chatRequest,
            @DestinationVariable("roomId") Long roomId
    ) {

        chatService.saveChat(chatRequest, roomId);

        return ChatResponse.from(chatRequest);
    }

    @MessageMapping("/chat/{roomId}/enter")
    @SendTo("/topic/public/{roomId}")
    public ChatResponse enter(
            @Payload ChatRequest chatRequest,
            @DestinationVariable("roomId") Long roomId,
            SimpMessageHeaderAccessor headerAccessor
    ) {

        headerAccessor.getSessionAttributes().put("username", chatRequest.getSender());
        headerAccessor.getSessionAttributes().put("roomId", roomId);

        return ChatResponse.from(chatRequest);
    }

    @GetMapping("/chat/{roomId}/messages")
    @ResponseBody
    public ResponseEntity<ChatListResponse> getPrevChats(@PathVariable("roomId") Long roomId) {

        ChatListResponse chats = chatService.getChatsByRoomId(roomId);

        return ResponseEntity.status(HttpStatus.OK).body(chats);
    }
}
