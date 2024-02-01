package com.example.chattingservice.domain.chatroom.service;

import com.example.chattingservice.domain.chatroom.dto.request.CreateChatRoomRequest;

public interface ChatRoomService {

    Long createChatRoom(CreateChatRoomRequest request, Long memberId);
}
