//package com.tadak.signaling.server.controller;
//
//
//import com.tadak.signaling.server.domain.WebSocketMessage;
//import lombok.RequiredArgsConstructor;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.simp.SimpMessageSendingOperations;
//import org.springframework.stereotype.Controller;
//
//@Controller
//@RequiredArgsConstructor
//public class WebRtcController {
//    private final SimpMessageSendingOperations template;
//    @MessageMapping("join")
//    public void join(WebSocketMessage message){
//        template.convertAndSend("/sub/"+message.getRoomId(),message);
//    }
//}
