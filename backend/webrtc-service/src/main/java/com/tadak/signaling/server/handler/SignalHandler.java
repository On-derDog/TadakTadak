package com.tadak.signaling.server.handler;

import com.tadak.signaling.server.domain.WebSocketMessage;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class SignalHandler extends TextWebSocketHandler {
    private final Logger logger =  LoggerFactory.getLogger(this.getClass());
    //messageType 정의
    //SDP 메시지
    private static final String MSG_TYPE_OFFER = "offer";
    private static final String MSG_TYPE_ANSWER = "answer";
    // ICE 메시지
    private static final String MSG_TYPE_ICE = "ice";
    // 데이터 타입 메시지
    private static final String MSG_TYPE_JOIN ="join";
    private static final String MSG_TYPE_LEAVE = "leave";

    //소켓 연결 되었을 때
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        try{
            WebSocketMessage webSocketMessage = WebSocketMessage.builder()
                    .userId("Server") //임시
                    .type(MSG_TYPE_JOIN)
                    .roomId("true")
                    .candidate(null)
                    .sdp(null)
                    .build();
            session.sendMessage(new TextMessage(webSocketMessage.toString()));
        }catch (Exception e){
            logger.debug("에러 발생:"+e.getMessage());
        }

    }
    //연결 끊어졌을 때
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        logger.info("[ws] 세션이 끝났습니다 status :"+status+",session : "+ session);
    }

    // 이 메시지를 통하여 ICE, SDP 통신이 일어난다.
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    }
}
