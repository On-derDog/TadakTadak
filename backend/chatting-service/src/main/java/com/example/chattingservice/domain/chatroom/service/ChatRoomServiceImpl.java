package com.example.chattingservice.domain.chatroom.service;

import com.example.chattingservice.domain.chatroom.dto.request.CreateChatRoomRequest;
import com.example.chattingservice.domain.chatroom.entity.ChatRoom;
import com.example.chattingservice.domain.chatroom.exception.NoChatRoomException;
import com.example.chattingservice.domain.chatroom.repository.ChatRoomRepository;
import java.util.Optional;
import javax.swing.text.html.Option;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;

    @Override
    public Long createChatRoom(CreateChatRoomRequest request, Long memberId) {
        ChatRoom chatRoomEntity = ChatRoom.toEntity(request, memberId);
        chatRoomRepository.save(chatRoomEntity);

        return memberId;
    }

    @Override
    @Transactional
    public Long enter(Long roomId) {
        ChatRoom chatRoom = findByRoomId(roomId);

        chatRoom.updateParticipantsCount();
        log.info("chatRoom: {}", chatRoom.toString());

        return chatRoom.getParticipantsCount();
    }

    @Override
    public Long exit(Long roomId) {
        return null;
    }

    private ChatRoom findByRoomId(Long roomId) {
        return chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new NoChatRoomException("방이 존재하지 않습니다."));
    }

}
