package com.tadak.chatroomservice.domain.chatroom.controller;

import com.tadak.chatroomservice.domain.chatroom.dto.request.EnterChatRoomRequest;
import com.tadak.chatroomservice.domain.chatroom.dto.response.ChatRoomResponse;
import com.tadak.chatroomservice.domain.chatroom.service.ChatRoomService;
import com.tadak.chatroomservice.domain.chatroom.dto.request.CreateChatroomRequest;
import com.tadak.chatroomservice.domain.chatroom.dto.response.CreateChatroomResponse;
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
    public ResponseEntity<Void> enter(@PathVariable Long roomId, @RequestBody EnterChatRoomRequest chatRoomRequest){
        chatRoomService.enter(roomId, chatRoomRequest);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    /**
     * 방 전체 리스트 조회
     */
    @GetMapping("/rooms")
    public ResponseEntity<List<ChatRoomResponse>> getAllChatroom() {
        List<ChatRoomResponse> chatRooms = chatRoomService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(chatRooms);
    }

}
