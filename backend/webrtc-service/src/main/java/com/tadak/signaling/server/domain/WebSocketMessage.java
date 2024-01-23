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
    private String userId; //보내는 유저의 id
    private String type; //메시지 타입
    private String roomId;
    private Object candidate; //상태
    private Object sdp; //sdp 정보
}
