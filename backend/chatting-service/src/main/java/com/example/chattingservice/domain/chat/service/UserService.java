package com.example.chattingservice.domain.chat.service;

import com.example.chattingservice.domain.chat.dto.request.UserInformationRequest;
import com.example.chattingservice.domain.chat.dto.response.UserParticipation;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.TreeMap;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final SimpMessagingTemplate template;
    private final KafkaTemplate kafkaTemplate;
    private final ObjectMapper objectMapper;
    private final Map<String, UserParticipation> users = new TreeMap();
    public static final String REFRESH_LIST_TOPIC_NAME = "refresh";
    public void newUserLogin(UserInformationRequest userInformationRequest){

        UserParticipation newUser = UserParticipation.builder()
                        .userId(0l)
                                .username(userInformationRequest.getUsername())
                                        .roomName(userInformationRequest.getRoomName())
                                                .build();

        users.put(userInformationRequest.getUsername(),newUser);
        kafkaTemplate.send(REFRESH_LIST_TOPIC_NAME,null);
    }
    public void removeUserWhenSocketDisabled(String username){
        users.remove(username);
        kafkaTemplate.send(REFRESH_LIST_TOPIC_NAME,null);
    }
    public void moveUser(String username, String roomName){
        UserParticipation user = users.get(username);
        user.changeRoomName(roomName);
        template.convertAndSend("/topic/users",users);
    }

    public void refreshList(String data)  {
        template.convertAndSend("/topic/users",users);
    }
}
