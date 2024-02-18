package com.example.chattingservice.domain.chat.repository;

import com.example.chattingservice.domain.chat.entity.OnlineUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OnlineUserRepository extends JpaRepository<OnlineUser,Long> {
}
