package com.tadak.signaling.server.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tadak.signaling.server.domain.WebSocketMessage;
import com.tadak.signaling.server.dto.ChatroomDto;
import com.tadak.signaling.server.service.RtcService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class SignalHandler extends TextWebSocketHandler {
    private final Logger logger =  LoggerFactory.getLogger(this.getClass());
    private final ObjectMapper objectMapper = new ObjectMapper();
    private Map<String, ChatroomDto> rooms = new HashMap<>();

    private final RtcService rtcService;
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
            String roomId = session.getUri().toString().split("/signal/")[1];
            logger.debug("roomId:"+roomId);
            WebSocketMessage webSocketMessage = WebSocketMessage.builder()
                    .fromUserId("Server") //임시
                    .type(MSG_TYPE_JOIN)
                    .roomId(roomId)
                    .candidate(null)
                    .sdp(null)
                    .build();
            sendMessage(session,webSocketMessage);
            //본인에게 websocket 메시지 발송
        }catch (Exception e){
            logger.debug("에러 발생:"+e.getMessage());
        }
    }

    private void sendMessage(WebSocketSession session,WebSocketMessage message){
        try{
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        }
        catch (Exception e){
            logger.debug(e.getMessage());
        }
    } //설정한 상대에게 WebSocketMessage를 전송하는 메소드
    //연결 끊어졌을 때
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        logger.info("[ws] 세션이 끝났습니다 status :"+status+",session : "+ session);
    }

    // 이 메시지를 통하여 ICE, SDP 통신이 일어난다.
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage textMessage) throws Exception {
        //TextMessage는 웹소켓으로부터 전달받은 메시지
        try{
            //json을 WebSocketMessage로 변환
            WebSocketMessage message = objectMapper.readValue(textMessage.getPayload(),WebSocketMessage.class);
            logger.debug(message.getType()+"/"+message.getFromUserId());
            String userId = message.getFromUserId();
            String roomId = message.getRoomId();
            ChatroomDto findRoom = rooms.get(roomId);

            if(findRoom==null) {
                Map<String,WebSocketSession> clients = new HashMap<>();
                findRoom = ChatroomDto.builder()
                    .roomId(roomId)
                    .clients(clients)
                    .build();
                //임시적으로 방 만들기
                rooms.put(roomId,findRoom);
            }


            switch (message.getType()){
                case MSG_TYPE_OFFER:
                case MSG_TYPE_ANSWER:
                case MSG_TYPE_ICE: // 상대방을 찾는 상황
                    Object candidate = message.getCandidate();
                    Object sdp = message.getSdp();
                    logger.debug(candidate!=null ? candidate.toString():sdp.toString());
                    if(findRoom!=null){
                        Map<String,WebSocketSession> clients = rtcService.getClients(findRoom);
                        for( String client : clients.keySet()){
                            if(!client.equals(userId)){ //본인이 아니라면
                                sendMessage(clients.get(client) //메시지 재전송
                                        ,WebSocketMessage.builder()
                                                .fromUserId(userId)
                                                .type(message.getType())
                                                .roomId(roomId)
                                                .candidate(candidate)
                                                .sdp(sdp)
                                                .build()
                                );
                            }
                        }
                    }
                    break;
                case MSG_TYPE_JOIN:
                    logger.debug(userId+"가 방에 참여하였습니다"+message.getRoomId());
                    // room에 user 추가
                    rtcService.addClients(findRoom,userId,session);
                    break;

                case MSG_TYPE_LEAVE:
                    Optional<String> client = rtcService.getClients(findRoom).keySet().stream()
                                    .filter(clientsKeys -> clientsKeys.equals(userId))
                                            .findAny();

                    //존재한다면 삭제
                    if(client.isPresent()) rtcService.removeClient(findRoom,client.get());

                    logger.debug(userId+"가 방을 나갔습니다");
                    break;
            }



        }catch (Exception e){
            logger.debug(e.getMessage());
        }
    }
}
