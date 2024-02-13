package com.tadak.chatroomservice.domain.service;

import com.tadak.chatroomservice.domain.dto.request.CreateChatroomRequest;
import com.tadak.chatroomservice.domain.dto.response.CreateChatroomResponse;
import com.tadak.chatroomservice.domain.entity.ChatRoom;
import com.tadak.chatroomservice.domain.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    @Transactional
    public CreateChatroomResponse create(CreateChatroomRequest chatroomRequest) {
        ChatRoom chatRoom = ChatRoom.toEntity(chatroomRequest);
        chatRoomRepository.save(chatRoom);
        return CreateChatroomResponse.of(chatRoom);

    }
}
