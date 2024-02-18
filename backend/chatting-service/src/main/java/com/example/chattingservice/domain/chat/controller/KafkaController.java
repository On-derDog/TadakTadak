package com.example.chattingservice.domain.chat.controller;

import com.example.chattingservice.domain.chat.service.ChatService;
import com.example.chattingservice.domain.chat.service.UserService;
import com.example.chattingservice.global.config.KafkaConsumerConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class KafkaController {


    private final UserService userService;
    private final ChatService chatService;
    public static final String REFRESH_LIST_TOPIC_NAME = "refresh";
    public static final String STATUS_TOPIC_NAME ="status-change";

    @KafkaListener(topics=REFRESH_LIST_TOPIC_NAME,groupId = KafkaConsumerConfig.SOCKET_CONSUMER_ID)
    public void refreshListener(String data)  {
        userService.refreshList(data);
    }

    @KafkaListener(topics=ChatService.CHATTING_TOPIC_NAME,groupId = KafkaConsumerConfig.SOCKET_CONSUMER_ID)
    public void chatListener(String data){
        System.out.println(data);
        chatService.receiveChat(data);
    }

}
