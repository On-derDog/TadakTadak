package com.example.chattingservice.domain.chat.service;

import com.example.chattingservice.domain.chat.dto.request.ChatRequest;
import com.example.chattingservice.domain.chat.dto.response.ChatListResponse;
import com.example.chattingservice.domain.chat.dto.response.ChatResponse;
import java.util.List;

public interface ChatService {
    ChatResponse save(ChatRequest chatRequest);
    ChatListResponse getChatsByRoomId(Long roomId);
}
