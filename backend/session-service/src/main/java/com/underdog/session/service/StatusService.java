package com.underdog.session.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.underdog.session.domain.OnlineUser;
import com.underdog.session.repository.StatusRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StatusService {

    private final KafkaTemplate kafkaTemplate;
    private final ObjectMapper objectMapper;
    private final StatusRepository statusRepository;
    private static final String REFRESH_LIST_TOPIC_NAME = "refresh";

    public void changeStatus(String data)  {
        JsonNode object;
        try{
            object = objectMapper.readTree(data);
        }
        catch (Exception e){
            e.printStackTrace();
            throw new IllegalArgumentException();
        }
        System.out.println(object);
        String username = object.get("username").asText();
        String roomName = object.get("roomName").asText();
        String status = object.get("status").asText();
        Optional<OnlineUser> onlineUser = statusRepository.findOnlineUserByUsername(username);
        if(onlineUser.isPresent()){ //db에 존재하는 User라면
            OnlineUser onlineUser1 = onlineUser.get();
            if(status.equals("exit")) statusRepository.delete(onlineUser1);
            if(status.equals("login")) onlineUser1.setRoomName("");
            if(status.equals("enter")) onlineUser1.setRoomName(roomName);
            statusRepository.save(onlineUser1);
        }
        if(!onlineUser.isPresent()){
            if(status.equals("exit")) return;
            OnlineUser newOnlineUser = OnlineUser.builder()
                    .roomName(roomName)
                    .username(username)
                    .build();
            if(status.equals("enter")) newOnlineUser.setRoomName(roomName);
            statusRepository.save(newOnlineUser);
        }
        kafkaTemplate.send(REFRESH_LIST_TOPIC_NAME,"change");
         // 리스트 새로 발행하라고 전송
    }
}
