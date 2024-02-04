package com.tadak.signaling.server.dto;

import com.tadak.signaling.server.domain.KurentoUser;
import lombok.Builder;
import lombok.Getter;
import org.kurento.client.KurentoClient;
import org.kurento.client.MediaPipeline;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashMap;
import java.util.Map;

@Getter
@Builder
public class KurentoRoom {
    private String roomId; //채팅방 아이디
    private int userCount;

    private final Logger log = LoggerFactory.getLogger(KurentoRoom.class);
    //session = clients로
    private KurentoClient kurentoClient;
    private MediaPipeline pipeLine;
    //추후 concurrent map을 사용할 수도 있음
    private Map<String, KurentoUser> clients;


    public KurentoRoom(String roomId,KurentoClient kurentoClient){
        this.roomId = roomId;
        this.userCount =0;
        this.clients = new HashMap<>();
        this.kurentoClient = kurentoClient;
        this.pipeLine = this.kurentoClient.createMediaPipeline();
    }
    public KurentoUser join(String userId,WebSocketSession session){
        log.info(userId+"가 접속하였습니다.");
        KurentoUser newUser = new KurentoUser(userId,roomId,pipeLine,session);
        clients.put(userId,newUser);
        userCount++;
        return newUser;
    }




}
