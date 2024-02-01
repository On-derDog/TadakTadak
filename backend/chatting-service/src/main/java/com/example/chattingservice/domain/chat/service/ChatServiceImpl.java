package com.example.chattingservice.domain.chat.service;

import com.example.chattingservice.domain.chat.dto.request.ChatRequest;
import com.example.chattingservice.domain.chat.dto.response.ChatListResponse;
import com.example.chattingservice.domain.chat.dto.response.ChatsResponse;
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
    public void saveChat(ChatRequest chatRequest, Long roomId) {
        Chat chatEntity = Chat.toEntity(chatRequest, roomId);

        Chat savedEntity = chatRepository.save(chatEntity);
        Validation.isSuccessSaveChat(savedEntity);
    }

    @Override
    public ChatListResponse getChatsByRoomId(Long roomId) {
        List<Chat> chatList = chatRepository.findByRoomId(roomId);

        Validation.isExistChatList(chatList);

        List<ChatsResponse> chats = chatList.stream()
                .map(ChatsResponse::from)
                .collect(Collectors.toList());

        boolean hasNext = false;

        return ChatListResponse.from(chats, hasNext);
    }
}
