package com.tadak.chatroomservice.domain.controller;

import com.tadak.chatroomservice.domain.dto.request.CreateChatroomRequest;
import com.tadak.chatroomservice.domain.dto.response.CreateChatroomResponse;
import com.tadak.chatroomservice.domain.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
