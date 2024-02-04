package com.tadak.signaling.server.domain;


import com.google.gson.JsonObject;
import lombok.*;
import org.kurento.client.EventListener;
import org.kurento.client.IceCandidateFoundEvent;
import org.kurento.client.MediaPipeline;
import org.kurento.client.WebRtcEndpoint;
import org.kurento.jsonrpc.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.Closeable;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor

@Getter
public class KurentoUser  {
   private static final Logger log = LoggerFactory.getLogger(KurentoUser.class);
   private final String userId;
   private final String roomId;
   private final WebSocketSession session;

   private final MediaPipeline pipeline;

    //내 것을 밖으로 내보내는 webRtcEndPoint객체
   private final WebRtcEndpoint outPutMedia;
   private final Map<String,WebRtcEndpoint> inputMedias;

   public KurentoUser(String userId,String roomId,MediaPipeline pipeline,WebSocketSession session){
      this.userId = userId;
      this.roomId = roomId;
      this.pipeline = pipeline;
      this.session = session;
      this.inputMedias = new HashMap<>();
      //외부로 송신하는 point에 대한 설정
      this.outPutMedia = new WebRtcEndpoint.Builder(pipeline).useDataChannels().build();
   }

   public String getAnswer(KurentoUser sender,String sdpOffer){
      if(sender.getUserId().equals(this.userId)){

         return outPutMedia.processOffer(sdpOffer); //본인의 offer를 받게된다면 본인의 outPutMedia를 보냄
      }
      return getAnswerEndPoint(sender).processOffer(sdpOffer);
   }
   public WebRtcEndpoint getAnswerEndPoint(KurentoUser sender){
      log.info(sender.getUserId()+"의 video를 받습니다 to:"+this.userId);

      //sender의 webrtcEndPoint를 가져옴
      WebRtcEndpoint inputMedia = inputMedias.get(sender.getUserId());
      if(inputMedia== null){ //null 이라면 건 새롭게 만들어줘야함
         log.info(sender.getUserId()+"의 endPoint를 추가합니다");
         inputMedia = new WebRtcEndpoint.Builder(pipeline).useDataChannels().build();
         //새롭게 만든 inputMedia의 본인의 addIceCandidateFoundListner 메소드를 실행
         inputMedia.addIceCandidateFoundListener(new EventListener<IceCandidateFoundEvent>() {
            @Override
            public void onEvent(IceCandidateFoundEvent event) {
               JsonObject response = new JsonObject();
               response.addProperty("type", "ice");
               response.addProperty("fromUserId", userId);
               response.add("candidate", JsonUtils.toJsonObject(event.getCandidate()));
               try {
                  // 새로 webRtcEndpoint 가 만들어 졌기 때문에 모든 UserSession 이 이것을 동일하게 공유해야 할 필요가 있다.
                  // 즉 모든 UserSession 의 정보를 일치시키기 위해 동기화 - synchronized - 실행
                  // 이를 통해서 모든 user 의 incomingMedia 가 동일하게 일치 - 동기화 - 됨
                  // 근데 이 method는 없어도 될 거같기도 왜냐면 애초에 answerENdPoint 메서드를 모든 유저가 받을것
                  synchronized (session) {
                     session.sendMessage(new TextMessage(response.toString()));
                  }
               } catch (IOException e) {
                  log.debug(e.getMessage());
               }
            }
         });
         this.inputMedias.put(sender.getUserId(),inputMedia);
         log.info(sender.getUserId()+"의 endPoint를 추가했습니다");
      }
      //보낸 사람의 outMedia와 받는 사람이 가지고 있는 보낸 사람의 inputMedia를 동기화
      sender.getOutPutMedia().connect(inputMedia);
      return inputMedia;
   }
}
