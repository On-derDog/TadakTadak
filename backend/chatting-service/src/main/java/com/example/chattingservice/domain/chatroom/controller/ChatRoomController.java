package com.example.chattingservice.domain.chatroom.controller;

import com.example.chattingservice.domain.chatroom.dto.request.CreateChatRoomRequest;
import com.example.chattingservice.domain.chatroom.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/chatroom")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @PostMapping("/{memberId}")
    public ResponseEntity<Long> createChatRoom(@PathVariable("memberId") Long memberId,
                                         @RequestBody CreateChatRoomRequest request) {

        Long hostId = chatRoomService.createChatRoom(request, memberId);

        return ResponseEntity.status(HttpStatus.OK).body(hostId);
    }

    @PatchMapping("/enter/{roomId}")
    public ResponseEntity<Long> enterChatRoom(@PathVariable("roomId") Long roomId) {
        Long participantsCount = chatRoomService.enter(roomId);

        return ResponseEntity.status(HttpStatus.OK).body(participantsCount);
    }

    @PatchMapping("/exit/{roomId}")
    public ResponseEntity<Long> exitChatRoom(@PathVariable("roomId") Long roomId) {
        Long participantsCount = chatRoomService.exit(roomId);

        return ResponseEntity.status(HttpStatus.OK).body(participantsCount);
    }
}
