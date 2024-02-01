package com.example.chattingservice.domain.chat.repository;

import com.example.chattingservice.domain.chat.entity.Chat;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChatRepository extends MongoRepository<Chat, Long> {

    List<Chat> findByRoomId(Long roomId);
}
