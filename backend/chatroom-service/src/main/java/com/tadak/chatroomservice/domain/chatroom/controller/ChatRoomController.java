package com.tadak.chatroomservice.domain.chatroom.controller;

import com.tadak.chatroomservice.domain.chatmember.dto.response.EnterChatMemberResponse;
import com.tadak.chatroomservice.domain.chatroom.dto.request.ChatRoomRequest;
import com.tadak.chatroomservice.domain.chatroom.dto.request.CreateChatroomRequest;
import com.tadak.chatroomservice.domain.chatroom.dto.response.*;
import com.tadak.chatroomservice.domain.chatroom.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chatroom-service")
@Slf4j
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    /**
     * 방 생성
     */
    @PostMapping("/create")
    public ResponseEntity<CreateChatroomResponse> create(@RequestBody CreateChatroomRequest chatroomRequest){
        CreateChatroomResponse createChatroomResponse = chatRoomService.create(chatroomRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(createChatroomResponse);
    }

    /**
     * 방 입장
     */
    @PostMapping("/room-in/{roomId}")
    public ResponseEntity<EnterChatMemberResponse> enter(@PathVariable("roomId") Long roomId, @RequestBody ChatRoomRequest chatRoomRequest){
        EnterChatMemberResponse enter = chatRoomService.enter(roomId, chatRoomRequest);
        return ResponseEntity.status(HttpStatus.OK).body(enter);
    }

    /**
     * 방 삭제
     */
    @DeleteMapping("/delete/{roomId}")
    public ResponseEntity<Void> deleteChatRoom(@PathVariable("roomId") Long roomId, @RequestBody ChatRoomRequest chatRoomRequest) {
        chatRoomService.deleteChatRoom(roomId, chatRoomRequest.getUsername());
        return ResponseEntity.status(HttpStatus.OK).build();
    }


    /**
     * 방 전체 리스트 조회
     */
    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoomResponse>> getAllChatRoom() {
        List<ChatRoomResponse> chatRooms = chatRoomService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(chatRooms);
    }

    /**
     * 강퇴
     */
    @PostMapping("/rooms/{roomId}/kicked/{username}")
    public ResponseEntity<KickMemberResponse> kickedMember(@PathVariable("roomId") Long roomId, @PathVariable("username") String username,
                                                           @RequestBody ChatRoomRequest chatRoomRequest){
        KickMemberResponse kickMemberResponse = chatRoomService.kickMember(roomId, username, chatRoomRequest.getUsername());
        return ResponseEntity.status(HttpStatus.OK).body(kickMemberResponse);
    }

    /**
     * 방장 위임
     */
    @PatchMapping("/rooms/{roomId}/change-owner/{username}")
    public ResponseEntity<ChangeOwnerResponse> changeOwner(@PathVariable("roomId") Long roomId, @PathVariable("username") String username,
                                                           @RequestBody ChatRoomRequest chatRoomRequest){
        ChangeOwnerResponse changeOwnerResponse = chatRoomService.changeOwner(roomId, username, chatRoomRequest.getUsername());
        return ResponseEntity.status(HttpStatus.OK).body(changeOwnerResponse);
    }

    /**
     * 개별 방 조회 (채팅방 제목)
     */
    @GetMapping("/rooms/{roomId}/roomName")
    public ResponseEntity<ChatRoomNameResponse> getChatRoomName(@PathVariable("roomId") Long roomId){
        ChatRoomNameResponse getChatRoom = chatRoomService.findChatRoom(roomId);
        return ResponseEntity.status(HttpStatus.OK).body(getChatRoom);
    }

    /**
     * 개별 방 조회 (참여자 수, 방장, 참여 멤버)
     */
    @GetMapping("/rooms/{roomId}/roomInformation")
    public ResponseEntity<ChatRoomInfoResponse> getChatRoomInfo(@PathVariable("roomId") Long roomId){
        ChatRoomInfoResponse getChatRoomInfo = chatRoomService.findChatRoomInfo(roomId);
        return ResponseEntity.status(HttpStatus.OK).body(getChatRoomInfo);
    }
}
