package com.example.chattingservice.domain.chat.service;

import com.example.chattingservice.domain.chat.controller.KafkaController;
import com.example.chattingservice.domain.chat.dto.request.UserInformationRequest;
import com.example.chattingservice.domain.chat.dto.response.UserParticipation;
import com.example.chattingservice.domain.chat.entity.OnlineUser;
import com.example.chattingservice.domain.chat.repository.OnlineUserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final SimpMessagingTemplate template;
    private final KafkaService kafkaService;
    private final ObjectMapper objectMapper;
    private final OnlineUserRepository onlineUserRepository;

    public void newUserLogin(UserInformationRequest userInformationRequest){

        UserParticipation newUser = UserParticipation.builder()
                        .userId(0l)
                                .username(userInformationRequest.getUsername())
                                        .roomName(userInformationRequest.getRoomName())
                                         .status("login")
                                                .build();
        try{
            System.out.println("로그인 완료");
            kafkaService.sendWithUsernameByKeyToSessionServerWhenLogin(KafkaController.STATUS_TOPIC_NAME,newUser);
        }catch (Exception e){
            throw new IllegalArgumentException();
        }
    }
    public void removeUserWhenSocketDisabled(String username){
        UserParticipation newUser = UserParticipation.builder()
                .userId(0l)
                .username(username)
                .roomName(null)
                .status("exit")
                .build();
        try{
           kafkaService.sendWithUsernameByKeyToSessionServerWhenLogin(KafkaController.STATUS_TOPIC_NAME,newUser);
        }catch (Exception e){
            throw new IllegalArgumentException();
        }
    }
    public void refreshList(String data)  {
        List<OnlineUser> onlineUsers = onlineUserRepository.findAll();
        for(OnlineUser  onlineUser: onlineUsers){
            System.out.println(onlineUser.getUsername()+"/"+onlineUser.getRoomName());
        }
        template.convertAndSend("/topic/users",onlineUsers);
    }
}
