package com.example.chattingservice.domain.chat.service;

import com.example.chattingservice.domain.chat.dto.request.ChatRequest;
import com.example.chattingservice.domain.chat.dto.response.ChatListResponse;
import java.time.LocalDateTime;

public interface ChatService {
    LocalDateTime saveChat(ChatRequest chatRequest, Long roomId);
    ChatListResponse getChatsByRoomId(Long roomId);
}
