package com.tadak.chatroomservice.domain.chatmember.service;

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
    public void enterMember(ChatRoom chatRoom, String username) {
        ChatMember chatMember = ChatMember.builder()
                .chatRoom(chatRoom)
                .username(username)
                .build();

        chatMemberRepository.save(chatMember);
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
}
