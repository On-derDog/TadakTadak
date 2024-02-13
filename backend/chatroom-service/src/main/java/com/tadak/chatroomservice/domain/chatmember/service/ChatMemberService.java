package com.tadak.chatroomservice.domain.chatmember.service;

import com.tadak.chatroomservice.domain.chatmember.entity.ChatMember;
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
}
