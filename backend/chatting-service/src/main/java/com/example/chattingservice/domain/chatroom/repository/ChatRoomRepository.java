package com.example.chattingservice.domain.chatroom.repository;

import com.example.chattingservice.domain.chatroom.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
}
