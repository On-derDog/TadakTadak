package com.tadak.chatroomservice.domain.chatroom.service;

import com.tadak.chatroomservice.domain.chatmember.dto.response.ChatMemberResponse;
import com.tadak.chatroomservice.domain.chatmember.dto.response.EnterChatMemberResponse;
import com.tadak.chatroomservice.domain.chatmember.entity.ChatMember;
import com.tadak.chatroomservice.domain.chatmember.service.ChatMemberService;
import com.tadak.chatroomservice.domain.chatroom.dto.request.ChatRoomRequest;
import com.tadak.chatroomservice.domain.chatroom.dto.response.*;
import com.tadak.chatroomservice.domain.chatroom.exception.AlreadyKickedException;
import com.tadak.chatroomservice.domain.chatroom.exception.NotFoundChatRoomException;
import com.tadak.chatroomservice.domain.chatroom.exception.NotRoomOwnerException;
import com.tadak.chatroomservice.domain.chatroom.mq.KafkaProducer;
import com.tadak.chatroomservice.domain.chatroom.mq.dto.EnterKafkaRequest;
import com.tadak.chatroomservice.domain.chatroom.repository.ChatRoomRepository;
import com.tadak.chatroomservice.domain.chatroom.dto.request.CreateChatroomRequest;
import com.tadak.chatroomservice.domain.chatroom.entity.ChatRoom;
import com.tadak.chatroomservice.global.error.ErrorCode;
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
    private final KafkaProducer kafkaProducer;
    private static final String REFRESH_LIST_TOPIC_NAME = "refresh";

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
            throw new AlreadyKickedException(ErrorCode.KICKED_MEMBER_ERROR);
        }

        // 채팅방에 없는 member 일 경우 save 로직
        if (!chatMemberService.existsChatRoomAndUsername(chatRoom, chatRoomRequest.getUsername())) {
            EnterKafkaRequest enterKafkaRequest = EnterKafkaRequest.from(chatRoom, chatRoomRequest.getUsername());
            kafkaProducer.sendWithUsernameByKeyToSessionServer(KafkaProducer.STATUS_TOPIC_NAME, enterKafkaRequest);
            return chatMemberService.enterMember(chatRoom, chatRoomRequest.getUsername());
        }

        // 채팅방에 member가 있을 경우 get으로 가져와서 전달
        ChatMember existingChatMember = chatMemberService.getChatMemberByChatRoomAndUsername(chatRoom, chatRoomRequest.getUsername());

        // kafka send
        EnterKafkaRequest enterKafkaRequest = EnterKafkaRequest.from(chatRoom, chatRoomRequest.getUsername());
        kafkaProducer.sendWithUsernameByKeyToSessionServer(KafkaProducer.STATUS_TOPIC_NAME, enterKafkaRequest);

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
            throw new NotRoomOwnerException(ErrorCode.NOT_OWNER_ERROR);
        }
    }

    /**
     * 방 찾기
     */
    private ChatRoom findByChatRoom(Long roomId) {
        return chatRoomRepository.findById(roomId)
                .orElseThrow(() -> new NotFoundChatRoomException(ErrorCode.NOT_FOUND_CHATROOM_ERROR));
    }

    /**
     * @param roomId : 방 ID
     * @param username : Owner가 될 대상
     * @param owner : 현재 Owner
     */
    @Transactional
    public ChangeOwnerResponse changeOwner(Long roomId, String username, String owner) {
        ChatRoom chatRoom = findByChatRoom(roomId);
        validOwner(owner, chatRoom.getOwner());

        chatMemberService.getChatMemberByChatRoomAndUsername(chatRoom, username);

        chatRoom.updateOwner(username);

        return ChangeOwnerResponse.from(chatRoom);
    }

    public OneChatRoomResponse findChatRoom(Long roomId) {
        ChatRoom chatRoom = findByChatRoom(roomId);

        List<ChatMemberResponse> chatMemberResponses = chatRoom.getChatMembers().stream()
                .map(ChatMemberResponse::from).toList();

        return OneChatRoomResponse.of(chatRoom, chatMemberResponses);
    }
}
