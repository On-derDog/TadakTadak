package com.example.chattingservice.domain.chat.service;

import com.example.chattingservice.domain.chat.dto.request.UserInformationRequest;
import com.example.chattingservice.domain.chat.dto.response.UserParticipation;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.json.JsonObject;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final SimpMessagingTemplate template;
    private final ObjectMapper objectMapper;
    private final Map<String, UserParticipation> users = new TreeMap();
    public void newUserLogin(UserInformationRequest userInformationRequest){

        UserParticipation newUser = UserParticipation.builder()
                        .userId(0l)
                                .username(userInformationRequest.getUsername())
                                        .roomName(userInformationRequest.getRoomName())
                                                .build();

        users.put(userInformationRequest.getUsername(),newUser);
        template.convertAndSend("/topic/users",users);
    }
    public void removeUser(String username){
        users.remove(username);
        template.convertAndSend("/topic/users",users);
    }
    public void moveUser(String username, String roomName){
        UserParticipation user = users.get(username);
        user.changeRoomName(roomName);
        template.convertAndSend("/topic/users",users);
    }

    public void userEnterRoom(String data)  {
        try{
            JsonNode object = objectMapper.readTree(data);
            String roomName = object.get("roomName").asText();
            String username = object.get("username").asText();
            UserParticipation user = users.get(username);
            if(user ==null){
                users.put(username,UserParticipation.builder()
                        .roomName(roomName)
                        .username(username)
                        .build());
            }
            else{
                user.changeRoomName(roomName);
            }
            template.convertAndSend("/topic/users",users);
        }catch (Exception e){
            e.printStackTrace();
        }

    }
}
