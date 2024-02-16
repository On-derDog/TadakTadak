package com.example.chattingservice.domain.chat.controller;

import com.example.chattingservice.domain.chat.dto.request.UserInformationRequest;
import com.example.chattingservice.domain.chat.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class OnlineController {
    private final UserService userService;


    @MessageMapping("/users")
    public void showUsers(UserInformationRequest userInformationRequest) {
       userService.newUserLogin(userInformationRequest);
    }
}
