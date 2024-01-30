package com.example.chattingservice.domain.chat.service;

import com.example.chattingservice.domain.chat.dto.request.ChatRequest;
import com.example.chattingservice.domain.chat.dto.response.ChatResponse;
import com.example.chattingservice.domain.chat.dto.response.ChatsResponse;
import java.util.List;

public interface ChatService {
    ChatResponse save(ChatRequest chatRequest);
    List<ChatsResponse> getChatsByRoomId(Long roomId);
}
