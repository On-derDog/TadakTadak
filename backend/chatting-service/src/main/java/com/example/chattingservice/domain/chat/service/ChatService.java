package com.example.chattingservice.domain.chat.service;


import com.example.chattingservice.domain.chat.dto.request.ChatRequest;
import com.example.chattingservice.domain.chat.dto.response.ChatHistoryResponse;
import com.example.chattingservice.domain.chat.dto.response.ChatListResponse;
import com.example.chattingservice.domain.chat.dto.response.ChatResponse;
import com.example.chattingservice.domain.chat.entity.Chat;
import com.example.chattingservice.domain.chat.exception.validation.Validation;
import com.example.chattingservice.domain.chat.repository.ChatRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final KafkaTemplate kafkaTemplate;
    private final SimpMessagingTemplate messagingTemplate;
    private final ObjectMapper objectMapper;
    private final ChatRepository chatRepository;
    private final KafkaService kafkaService;
    public static final String CHATTING_TOPIC_NAME = "chatting";

    public void sendChat(ChatRequest chatRequest, Long roomId){
        Chat chatEntity = Chat.toEntity(chatRequest, roomId);
//        Chat savedEntity = chatRepository.save(chatEntity);
//        Validation.isSuccessSaveChat(savedEntity);
        try{
            String objectToString = objectMapper.writeValueAsString(ChatResponse.from(chatEntity));
            kafkaService.sendMessageToAllPartitionsWithoutKey(CHATTING_TOPIC_NAME,objectToString);
        }catch (Exception e){
            throw new IllegalArgumentException();
        }

    }
    public void receiveChat(String data){
        try{
            JsonNode object = objectMapper.readTree(data);
            ChatResponse chatResponse = ChatResponse.fromObject(object);
            messagingTemplate.convertAndSend("/topic/public/"+chatResponse.getRoomId(),chatResponse);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalArgumentException();
        }
    }
    public ChatListResponse getChatsByRoomId(Long roomId) {
        List<Chat> chatList = chatRepository.findByRoomId(roomId);

        Validation.isExistChatList(chatList);

        List<ChatHistoryResponse> chats = chatList.stream()
                .map(ChatHistoryResponse::from)
                .collect(Collectors.toList());

        boolean hasNext = false;

        return ChatListResponse.of(chats, hasNext);
    }


}
