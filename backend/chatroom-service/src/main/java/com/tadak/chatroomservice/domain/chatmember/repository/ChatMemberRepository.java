package com.tadak.chatroomservice.domain.chatmember.repository;

import com.tadak.chatroomservice.domain.chatmember.entity.ChatMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMemberRepository extends JpaRepository<ChatMember, Long> {
}
