import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

const VideoCall = () => {
  const socketRef = useRef<WebSocket>();
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection>();

  const { roomName } = useParams();
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoEnabled,
        audio: audioEnabled,
      });

      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }
      if (!(pcRef.current && socketRef.current)) {
        return;
      }
      stream.getTracks().forEach((track) => {
        if (!pcRef.current) {
          return;
        }
        pcRef.current.addTrack(track, stream);
      });

      pcRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          if (!socketRef.current) {
            return;
          }
          console.log("recv candidate");
          socketRef.current.send(JSON.stringify({ type: "candidate", candidate: e.candidate, roomName }));
        }
      };

      pcRef.current.ontrack = (e) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = e.streams[0];
        }
      };
    } catch (e) {
      console.error(e);
    }
  };
  const createOffer = async () => {
    console.log("create Offer");
    if (!(pcRef.current && socketRef.current)) {
      return;
    }
    try {
      const sdp = await pcRef.current.createOffer();
      pcRef.current.setLocalDescription(sdp);
      console.log("sent the offer");
      socketRef.current.send(JSON.stringify({ type: "offer", sdp, roomName }));
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (sdp: RTCSessionDescriptionInit) => {
    console.log("createAnswer");
    if (!(pcRef.current && socketRef.current)) {
      return;
    }

    try {
      pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
      const answerSdp = await pcRef.current.createAnswer();
      pcRef.current.setLocalDescription(answerSdp);

      console.log("sent the answer");
      socketRef.current.send(JSON.stringify({ type: "answer", answerSdp, roomName }));
      } catch (e) {
        console.error(e);
      }
  };

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };
  
  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
  };

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8080/signal/1");

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");

      const message = {
        fromUserId: '1',
        type: 'ice',
        roomId: '1',
        candidate: null,
        sdp: null
      };

      socketRef.current?.send(JSON.stringify(message));

      getMedia();
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.type) {
        case "offer":
          console.log("recv Offer");
          createAnswer(message.sdp);
          break;
        case "answer":
          console.log("recv Answer");
          pcRef.current?.setRemoteDescription(new RTCSessionDescription(message.answerSdp));
          break;
        case "candidate":
          console.log("recv candidate");
          pcRef.current?.addIceCandidate(new RTCIceCandidate(message.candidate));
          break;
        default:
          break;
      }
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    pcRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, [audioEnabled, videoEnabled]);

  return (
    <div
      id="Wrapper"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <video
        id="localvideo"
        style={{ width: 500, height: 500, backgroundColor: "black" }}
        ref={myVideoRef}
        autoPlay
        muted
      />
      <video
        id="remotevideo"
        style={{ width: 500, height: 500, backgroundColor: "black" }}
        ref={remoteVideoRef}
        autoPlay
      />
      <div>
        <button onClick={toggleAudio}>{audioEnabled ? "Mute" : "Unmute"}</button>
        <button onClick={toggleVideo}>{videoEnabled ? "Camera Off" : "Camera On"}</button>
      </div>
    </div>
  );
};

export default VideoCall;
