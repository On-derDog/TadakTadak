package com.example.chattingservice.domain.chat.service;

import com.example.chattingservice.domain.chat.dto.request.ChatRequest;
import com.example.chattingservice.domain.chat.dto.response.ChatListResponse;
import com.example.chattingservice.domain.chat.dto.response.ChatResponse;

public interface ChatService {
    ChatResponse saveChat(ChatRequest chatRequest, Long roomId);
    ChatListResponse getChatsByRoomId(Long roomId);
}
