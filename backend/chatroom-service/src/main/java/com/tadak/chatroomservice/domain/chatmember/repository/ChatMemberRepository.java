package com.tadak.chatroomservice.domain.chatmember.repository;

import com.tadak.chatroomservice.domain.chatmember.entity.ChatMember;
import com.tadak.chatroomservice.domain.chatroom.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatMemberRepository extends JpaRepository<ChatMember, Long> {
    Optional<ChatMember> findByChatRoomAndUsername(ChatRoom chatRoom, String username);

    boolean existsByChatRoomAndUsername(ChatRoom chatRoom, String username);
}
