package com.example.chattingservice.domain.chat.service;

import com.example.chattingservice.domain.chat.dto.request.UserInformationRequest;
import com.example.chattingservice.domain.chat.dto.response.UserParticipation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
    private final Map<String, UserParticipation> users = new TreeMap();
    public void newUserLogin(UserInformationRequest userInformationRequest){

        UserParticipation newUser = UserParticipation.builder()
                        .userId(0l)
                                .username(userInformationRequest.getUsername())
                                        .roomName("")
                                                .build();

        users.put(userInformationRequest.getUsername(),newUser);
        template.convertAndSend("/topic/users",users);
    }
    public void moveUser(String username, String roomName){
        UserParticipation user = users.get(username);
        user.changeRoomName(roomName);
        template.convertAndSend("/topic/users",users);
    }
}
