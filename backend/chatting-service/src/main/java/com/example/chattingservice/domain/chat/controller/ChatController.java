package com.example.chattingservice.domain.chat.controller;

import com.example.chattingservice.domain.chat.dto.request.ChatRequest;
import com.example.chattingservice.domain.chat.dto.response.ChatResponse;
import com.example.chattingservice.domain.chat.dto.response.ChatsResponse;
import com.example.chattingservice.domain.chat.service.ChatService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/chat/{roomId}/messages")
    @ResponseBody
    public ResponseEntity<List<ChatsResponse>> getPrevChats(@PathVariable("roomId") Long roomId) {

        List<ChatsResponse> chats = chatService.getChatsByRoomId(roomId);

        return ResponseEntity.status(HttpStatus.OK).body(chats);
    }
}
