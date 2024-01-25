package com.tadak.signaling.server.domain;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WebSocketMessage {
    private String fromUserId; //보내는 유저의 id
    private String type; //메시지 타입
    private String roomId;
    private Object candidate; //상태
    private Object sdp; //sdp 정보( sdp란 비디오의 해상도 , 오디오 전송 또는 수신 여부 등등)
}
