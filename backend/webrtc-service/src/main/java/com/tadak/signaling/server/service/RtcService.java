package com.tadak.signaling.server.service;

import com.google.gson.JsonObject;
import com.tadak.signaling.server.domain.KurentoUser;
import com.tadak.signaling.server.dto.KurentoRoom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.kurento.client.KurentoClient;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Service
public class RtcService {
    private final int MINIMUM_USER_COUNT_TO_START = 1;
    // 여기에 Repository 설정 가능

    private static final String MSG_TYPE_OFFER = "offer";
    private static final String MSG_TYPE_ANSWER = "answer";
    // ICE 메시지
    private static final String MSG_TYPE_ICE = "ice";
    // 데이터 타입 메시지
    private static final String MSG_TYPE_JOIN ="join";
    private static final String MSG_TYPE_LEAVE = "leave";
    private Map<String, KurentoRoom> rooms = new HashMap<>();
    private Map<String, KurentoUser> users = new HashMap<>();
    private final KurentoClient kurentoClient;

    public KurentoRoom createKurentoRoom(String roomId){
        KurentoRoom newKurentoRoom = new KurentoRoom(roomId,kurentoClient);
        rooms.put(roomId,newKurentoRoom);
        return newKurentoRoom;
    }
    @PostConstruct
    public void makeKurentoRoomForTest(){
        KurentoRoom newKurentoRoom = new KurentoRoom("1",kurentoClient);
        rooms.put("1",newKurentoRoom);
    }
    public void joinKurentoRoom(JsonObject msg,WebSocketSession session){
        String roomId = msg.get("roomId").getAsString();
        String userId = msg.get("fromUserId").getAsString();
        KurentoRoom kurentoRoom= rooms.get(roomId);
        KurentoUser user = kurentoRoom.join(userId,session);
        users.put(user.getSession().getId(),user);
    }
    public void receiveVideoForm(JsonObject msg,WebSocketSession session) {
        KurentoUser sessionUser = users.get(session.getId()); // 수신자


        String roomId = msg.get("roomId").getAsString();
        String userId = msg.get("fromUserId").getAsString();
        String sdpOffer = msg.get("sdp").getAsString();

        KurentoRoom kurentoRoom = rooms.get(roomId);
        KurentoUser sender = kurentoRoom.getClients().get(userId);

        //answer 생성
        String sdpAnswer = sessionUser.getAnswer(sender,sdpOffer);

        JsonObject answerMessage = new JsonObject();
        answerMessage.addProperty("type", MSG_TYPE_ANSWER);
        answerMessage.addProperty("fromUserId", sender.getUserId());
        answerMessage.addProperty("sdp", sdpAnswer);

        synchronized (sessionUser.getSession()){
            try {
                session.sendMessage(new TextMessage(answerMessage.toString()));
            } catch (Exception e) {
               e.printStackTrace();
            }
        }
        sessionUser.getAnswerEndPoint(sender).gatherCandidates();
    }




//    public Map<String, WebSocketSession> getClients(KurentoRoom room){
//        return room.getClients();
//    }
//    public Map<String,WebSocketSession> addClients(KurentoRoom room, String userId, WebSocketSession session){
//        Map<String,WebSocketSession> users = room.getClients();
//        users.put(userId,session);
//        return users;
//    }
//    public void removeClient(KurentoRoom room, String userId){
//        room.getClients().remove(userId);
//    }
//    public boolean isUserCountMoreThan(KurentoRoom room){
//        return room.getClients().size()>1;
//    }
}
