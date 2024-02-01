package com.example.chattingservice.domain.chatroom.service;

import com.example.chattingservice.domain.chatroom.dto.request.CreateChatRoomRequest;
import com.example.chattingservice.domain.chatroom.entity.ChatRoom;
import com.example.chattingservice.domain.chatroom.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    @Override
    public Long createChatRoom(CreateChatRoomRequest request, Long memberId) {
        ChatRoom chatRoomEntity = ChatRoom.toEntity(request, memberId);
        chatRoomRepository.save(chatRoomEntity);

        return memberId;
    }
}
