import { useEffect, useRef, useState } from "react";

const VideoCallMult = () => {
  const socketRef = useRef<WebSocket>();
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement }>({});
  const myId = useRef<string>(Math.floor(Math.random() * 1000).toString());
  const pcRefs = useRef<{ [key: string]: RTCPeerConnection }>({});
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  // WebSocket 서버 연결
  const connectWebSocket = () => {
    socketRef.current = new WebSocket("ws://localhost:8080/signal/1");

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");

      const message = {
        fromUserId: myId.current,
        type: "join",
        roomId: "1",
        candidate: null,
        sdp: null,
      };

      socketRef.current?.send(JSON.stringify(message));
    };

    // 메시지 종류에 따라 다르게 처리
    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case "offer":
          console.log("recv Offer");
          createAnswer(message.sdp, message.fromUserId);
          break;
        case "answer":
          console.log("recv Answer");
          pcRefs.current[message.fromUserId]?.setRemoteDescription(
            new RTCSessionDescription(message.sdp)
          );
          break;
        case "ice":
          console.log("recv ICE Candidate");
          pcRefs.current[message.fromUserId]?.addIceCandidate(new RTCIceCandidate(message.candidate))
            .then(() => {
              console.log("Ice Candidate added successfully.");
            })
            .catch((error) => {
              console.error("Error adding Ice Candidate:", error);
            });
          break;
        default:
          break;
      }
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
    };
  };

  // 비디오 요소 생성
  const createVideoElement = (userId: string) => {
    const videoRef = document.createElement("video");
    videoRef.id = userId;
    videoRef.style.width = "200px";
    videoRef.style.height = "200px";
    videoRef.style.backgroundColor = "black";
    videoRef.autoplay = true;
    videoRef.playsInline = true;
    videoRefs.current[userId] = videoRef;
    document.getElementById("Wrapper")?.appendChild(videoRef);
  };

  // video and audio 설정
  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoEnabled,
        audio: audioEnabled,
      });

      stream.getTracks().forEach((track) => {
        Object.values(pcRefs.current).forEach((pc) => {
          pc.addTrack(track, stream);
        });
      });

      Object.values(pcRefs.current).forEach((pc) => {
        pc.onicecandidate = (e) => {
          if (e.candidate && socketRef.current) {
            console.log("send candidate");

            const message = {
              fromUserId: myId.current,
              type: "ice",
              roomId: "1",
              candidate: e.candidate,
            };
            socketRef.current.send(JSON.stringify(message));
          }
        };

        pc.ontrack = (e) => {
          const userId = e.streams[0].id;
          if (!videoRefs.current[userId]) {
            createVideoElement(userId);
          }
          videoRefs.current[userId].srcObject = e.streams[0];
        };

        createOffer(pc);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const createOffer = async (pc: RTCPeerConnection) => {
    console.log("create Offer");
    if (!(pc && socketRef.current)) {
      return;
    }
    try {
      const sdp = await pc.createOffer();
      await pc.setLocalDescription(sdp);

      const message = {
        fromUserId: myId.current,
        type: "offer",
        roomId: "1",
        candidate: null,
        sdp: pc.localDescription,
      };

      socketRef.current.send(JSON.stringify(message));
      console.log("sent the offer");
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (offerSdp: RTCSessionDescriptionInit, userId: string) => {
    console.log("createAnswer");
    if (!(pcRefs.current[userId] && socketRef.current)) {
      return;
    }
    try {
      pcRefs.current[userId].setRemoteDescription(offerSdp);

      const answerSdp = await pcRefs.current[userId].createAnswer();
      await pcRefs.current[userId].setLocalDescription(answerSdp);

      console.log("sent the answer");

      const message = {
        fromUserId: myId.current,
        type: "answer",
        roomId: "1",
        candidate: null,
        sdp: pcRefs.current[userId].localDescription,
      };

      socketRef.current.send(JSON.stringify(message));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    connectWebSocket();
    getMedia();
}, []);

return (
  <div
    id="Wrapper"
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      flexWrap: "wrap",
    }}
  />
);
};

export default VideoCallMult;