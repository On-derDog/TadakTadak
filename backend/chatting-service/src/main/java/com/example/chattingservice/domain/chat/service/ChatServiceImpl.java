package com.example.chattingservice.domain.chat.service;

import com.example.chattingservice.domain.chat.dto.request.ChatRequest;
import com.example.chattingservice.domain.chat.dto.response.ChatListResponse;
import com.example.chattingservice.domain.chat.dto.response.ChatHistoryResponse;
import com.example.chattingservice.domain.chat.dto.response.ChatResponse;
import com.example.chattingservice.domain.chat.entity.Chat;
import com.example.chattingservice.domain.chat.exception.validation.Validation;
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
    public ChatResponse saveChat(ChatRequest chatRequest, Long roomId) {
        Chat chatEntity = Chat.toEntity(chatRequest, roomId);

        Chat savedEntity = chatRepository.save(chatEntity);
        Validation.isSuccessSaveChat(savedEntity);

        return ChatResponse.from(savedEntity);
    }

    @Override
    public ChatListResponse getChatsByRoomId(Long roomId) {
        List<Chat> chatList = chatRepository.findByRoomId(roomId);

        Validation.isExistChatList(chatList);

        List<ChatHistoryResponse> chats = chatList.stream()
                .map(ChatHistoryResponse::from)
                .collect(Collectors.toList());

        boolean hasNext = false;

        return ChatListResponse.of(chats, hasNext);
    }
}
