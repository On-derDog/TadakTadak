package com.example.chattingservice.domain.chat.service;

import com.example.chattingservice.domain.chat.dto.request.ChatRequest;
import com.example.chattingservice.domain.chat.dto.response.ChatResponse;
import com.example.chattingservice.domain.chat.dto.response.ChatsResponse;
import com.example.chattingservice.domain.chat.entity.Chat;
import com.example.chattingservice.domain.chat.repository.ChatRepository;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{

    private final ChatRepository chatRepository;

    @Override
    public ChatResponse save(ChatRequest chatRequest) {
        return null;
    }

    @Override
    public List<ChatsResponse> getChatsByRoomId(Long roomId) {
        List<Chat> chatList = chatRepository.findByRoomId(roomId);

        return chatList.stream()
                .map(ChatsResponse::from)
                .collect(Collectors.toList());
    }
}
