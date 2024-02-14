package com.tadak.chatroomservice.domain.chatroom.service;

import com.tadak.chatroomservice.domain.chatmember.dto.response.EnterChatMemberResponse;
import com.tadak.chatroomservice.domain.chatmember.entity.ChatMember;
import com.tadak.chatroomservice.domain.chatmember.service.ChatMemberService;
import com.tadak.chatroomservice.domain.chatroom.dto.request.ChatRoomRequest;
import com.tadak.chatroomservice.domain.chatroom.dto.response.ChatRoomResponse;
import com.tadak.chatroomservice.domain.chatroom.dto.response.KickMemberResponse;
import com.tadak.chatroomservice.domain.chatroom.repository.ChatRoomRepository;
import com.tadak.chatroomservice.domain.chatroom.dto.request.CreateChatroomRequest;
import com.tadak.chatroomservice.domain.chatroom.dto.response.CreateChatroomResponse;
import com.tadak.chatroomservice.domain.chatroom.entity.ChatRoom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMemberService chatMemberService;

    @Transactional
    public CreateChatroomResponse create(CreateChatroomRequest chatroomRequest) {
        ChatRoom chatRoom = ChatRoom.toEntity(chatroomRequest);
        // 방 생성
        chatRoomRepository.save(chatRoom);
        // 방 입장
        EnterChatMemberResponse enterChatMemberResponse = chatMemberService.enterMember(chatRoom, chatRoom.getOwner());

        return CreateChatroomResponse.of(chatRoom, enterChatMemberResponse);

    }

    @Transactional
    public EnterChatMemberResponse enter(Long roomId, ChatRoomRequest chatRoomRequest) {
        ChatRoom chatRoom = findByChatRoom(roomId);

        if (chatMemberService.validEnterChatMember(chatRoom, chatRoomRequest.getUsername())){
            throw new IllegalArgumentException("이미 강퇴당한 채팅방 입니다.");
        }

        if (!chatMemberService.existsChatRoomAndUsername(chatRoom, chatRoomRequest.getUsername())) {
            return chatMemberService.enterMember(chatRoom, chatRoomRequest.getUsername());
        }

        ChatMember existingChatMember = chatMemberService.getChatMemberByChatRoomAndUsername(chatRoom, chatRoomRequest.getUsername());
        return EnterChatMemberResponse.of(existingChatMember, chatRoom.getParticipation());
    }

    public List<ChatRoomResponse> findAll() {
        List<ChatRoom> chatRooms = chatRoomRepository.findAll();
        
        return chatRooms.stream()
                .map(ChatRoomResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public void deleteChatRoom(Long roomId, String username) {
        ChatRoom chatRoom = findByChatRoom(roomId);

        validOwner(username, chatRoom.getOwner());

        chatRoomRepository.delete(chatRoom);
    }

    @Transactional
    public KickMemberResponse kickMember(Long roomId, Long chatMemberId, String username) {
        ChatRoom chatRoom = findByChatRoom(roomId);
        ChatMember chatMember = chatMemberService.findByChatMember(chatMemberId);
        // 방장 검증
        validOwner(username, chatRoom.getOwner());

        // 상태를 KICKED로 변경
        chatMember.updateState();
        // 채팅방 인원 감소
        chatRoom.decreaseParticipation();

        return KickMemberResponse.of(chatMember, chatRoom);
    }

    /**
     * 방장 검증
     */
    private void validOwner(String owner, String chatRoomOwner) {
        if (!owner.equals(chatRoomOwner)){
            throw new IllegalArgumentException("현재 방장이 아닙니다.");
        }
    }

    /**
     * 방 찾기
     */
    private ChatRoom findByChatRoom(Long roomId) {
        return chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new IllegalArgumentException("현재 방이 존재하지 않습니다."));
    }
}
