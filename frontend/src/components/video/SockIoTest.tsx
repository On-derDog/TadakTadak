import { useEffect } from 'react';
import io from 'socket.io-client';

const WebSock = () => {
  useEffect(() => {
    // 서버에 연결
    const socket = io('ws://localhost:8080', {
    transports: ['websocket'],
    });

    // 연결이 수립되면 실행되는 이벤트 핸들러
    socket.on('connect', () => {
      console.log('Connected to WebSocket');

      // 서버에 메시지 보내기
      socket.emit('chat message', 'Hello, Server!');

      // 서버로부터 메시지 받기
      socket.on('chat message', (msg: string) => {
        console.log('Received message from server:', msg);
      });
    });

    // 컴포넌트가 언마운트되면 소켓 연결 해제
    return () => {
      socket.disconnect();
    };
  }, []);

  return null;
};

export default WebSock;