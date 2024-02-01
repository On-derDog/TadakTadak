package com.example.chattingservice.domain.chat.service;

import com.example.chattingservice.domain.chat.dto.request.ChatRequest;
import com.example.chattingservice.domain.chat.dto.response.ChatListResponse;

public interface ChatService {
    void saveChat(ChatRequest chatRequest, Long roomId);
    ChatListResponse getChatsByRoomId(Long roomId);
}
