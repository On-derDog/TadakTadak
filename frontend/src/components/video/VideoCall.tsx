import { useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";

const VideoCall: React.FC = () => {
  const socketRef = useRef<Socket>();
  const myVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection>();

  const { roomName } = useParams<{ roomName: string }>(); // 라우터 매개변수에서 roomName 값을 가져옴

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
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
      const offer = await pcRef.current.createOffer();
      await pcRef.current.setLocalDescription(offer);
      console.log("sent the offer");
      socketRef.current.emit("offer", offer, roomName);
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (offer: RTCSessionDescription) => {
    console.log("createAnswer");
    if (!(pcRef.current && socketRef.current)) {
      return;
    }

    try {
      pcRef.current.setRemoteDescription(offer);
      const answer = await pcRef.current.createAnswer();
      await pcRef.current.setLocalDescription(answer);

      console.log("sent the answer");
      socketRef.current.emit("answer", answer, roomName);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    socketRef.current = io("localhost:8080/signal/1");

    pcRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    socketRef.current.on("offer", (offer: RTCSessionDescription) => {
      console.log("received the offer");
      createAnswer(offer);
    });

    socketRef.current.on("answer", (answer: RTCSessionDescription) => {
      console.log("received the answer");
      if (!pcRef.current) {
        return;
      }
      pcRef.current.setRemoteDescription(answer);
    });

    socketRef.current.on("candidate", async (candidate: RTCIceCandidate) => {
      console.log("received candidate");
      if (!pcRef.current) {
        return;
      }
      await pcRef.current.addIceCandidate(candidate);
    });

    socketRef.current.emit("join_room", roomName);

    getMedia();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (pcRef.current) {
        pcRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <video
        id="myVideo"
        style={{ width: 400, height: 400, backgroundColor: "black" }}
        ref={myVideoRef}
        autoPlay
      />
      <video
        id="remoteVideo"
        style={{ width: 400, height: 400, backgroundColor: "black" }}
        ref={remoteVideoRef}
        autoPlay
      />
    </div>
  );
};

export default VideoCall;