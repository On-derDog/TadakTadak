package com.tadak.chatroomservice.domain.chatmember.service;

import com.tadak.chatroomservice.domain.chatmember.dto.response.EnterChatMemberResponse;
import com.tadak.chatroomservice.domain.chatmember.entity.ChatMember;
import com.tadak.chatroomservice.domain.chatmember.entity.ChatMemberType;
import com.tadak.chatroomservice.domain.chatmember.repository.ChatMemberRepository;
import com.tadak.chatroomservice.domain.chatroom.entity.ChatRoom;
import com.tadak.chatroomservice.domain.chatroom.exception.AlreadyKickedException;
import com.tadak.chatroomservice.domain.chatroom.exception.CannotTransferOwnershipException;
import com.tadak.chatroomservice.domain.chatroom.exception.NotFoundChatMemberException;
import com.tadak.chatroomservice.domain.chatroom.exception.OverParticipationException;
import com.tadak.chatroomservice.global.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;

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

        if (Objects.equals(chatRoom.getCapacity(), chatRoom.getParticipation())){
            throw new OverParticipationException(ErrorCode.OVER_CHATROOM_PARTICIPATION_ERROR);
        }

        // 채팅방 인원 증가
        chatRoom.increaseParticipation();

        chatMemberRepository.save(chatMember);

        return EnterChatMemberResponse.of(chatMember, chatRoom.getParticipation());
    }

    public ChatMember findByChatMember(Long chatMemberId) {
        return chatMemberRepository.findById(chatMemberId)
                .orElseThrow(() -> new NotFoundChatMemberException(ErrorCode.NOT_FOUND_CHAT_MEMBER_ERROR));
    }

    public boolean validEnterChatMember(ChatRoom chatRoom, String username) {

        ChatMember chatMember = chatMemberRepository.findByChatRoomAndUsername(chatRoom, username)
                .orElse(null);

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
        ChatMember chatMember = chatMemberRepository.findByChatRoomAndUsername(chatRoom, username)
                .orElseThrow(() -> new NotFoundChatMemberException(ErrorCode.NOT_FOUND_CHAT_MEMBER_ERROR));

        // 방장 위임 할 경우 exception
        if (chatMember.getType() == ChatMemberType.KICKED){
            throw new CannotTransferOwnershipException(ErrorCode.CANNOT_TRANSFER_OWNER_ERROR);
        }

        return chatMember;
    }

}
