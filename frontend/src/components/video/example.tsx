import { useEffect, useRef, useState } from 'react';

const Example: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const websocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const startMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        createPeerConnection();
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    startMedia();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, []);

  const createPeerConnection = () => {
    const peerConnection = new RTCPeerConnection();

    peerConnectionRef.current = peerConnection;

    if (localStream) {
      localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
    }

    peerConnection.ontrack = (event) => {
      if (remoteVideoRef.current && event.streams.length) {
        setRemoteStream(event.streams[0]);
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
          websocketRef.current.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
        }
      }
    };
  };

  const startCall = async () => {
    if (peerConnectionRef.current) {
      const offer = await peerConnectionRef.current.createOffer();
      await peerConnectionRef.current.setLocalDescription(offer);
      if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
        websocketRef.current.send(JSON.stringify({ type: 'offer', sdp: offer }));
      }
    }
  };

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080/signal/1');
    websocketRef.current = websocket;

    websocket.onopen = () => {
      console.log('Connected to signaling server');
    };

    websocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'offer' && peerConnectionRef.current) {
        peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(message.sdp));
      } else if (message.type === 'candidate' && peerConnectionRef.current) {
        peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(message.candidate));
      }
    };

    return () => {
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <div>
        <video ref={localVideoRef} autoPlay muted playsInline></video>
      </div>
      <div>
        <video ref={remoteVideoRef} autoPlay playsInline></video>
      </div>
      <button onClick={startCall}>Start Call</button>
    </div>
  );
};

export default Example;