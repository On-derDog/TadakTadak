package com.tadak.chatroomservice.domain.chatmember.service;

import com.tadak.chatroomservice.domain.chatmember.dto.response.EnterChatMemberResponse;
import com.tadak.chatroomservice.domain.chatmember.entity.ChatMember;
import com.tadak.chatroomservice.domain.chatmember.entity.ChatMemberType;
import com.tadak.chatroomservice.domain.chatmember.repository.ChatMemberRepository;
import com.tadak.chatroomservice.domain.chatroom.entity.ChatRoom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChatMemberService {

    private final ChatMemberRepository chatMemberRepository;

    @Transactional
    public EnterChatMemberResponse enterMember(ChatRoom chatRoom, String username) {
        ChatMember chatMember = ChatMember.builder()
                .chatRoom(chatRoom)
                .username(username)
                .build();

        chatMemberRepository.save(chatMember);
        // 채팅방 인원 증가
        chatRoom.increaseParticipation();

        return EnterChatMemberResponse.of(chatMember, chatRoom.getParticipation());
    }

    public ChatMember findByChatMember(Long chatMemberId) {
        return chatMemberRepository.findById(chatMemberId)
                .orElseThrow(() -> new IllegalArgumentException("현재 방 유저가 존재하지 않습니다."));
    }

    public boolean validEnterChatMember(ChatRoom chatRoom, String username) {

        ChatMember chatMember = chatMemberRepository.findByChatRoomAndUsername(chatRoom, username);

        if (chatMember == null){
            return false;
        }

        log.info("chatMember type = {}", chatMember.getType());

        return chatMember.getType() == ChatMemberType.KICKED;
    }

    // 존재하면 true, 존재하지 않으면 false
    public boolean existsChatRoomAndUsername(ChatRoom chatRoom, String username) {
        return chatMemberRepository.existsByChatRoomAndUsername(chatRoom, username);
    }

    // ChatMember 가지고 오기
    public ChatMember getChatMemberByChatRoomAndUsername(ChatRoom chatRoom, String username) {
        return chatMemberRepository.findByChatRoomAndUsername(chatRoom, username);
    }
}
