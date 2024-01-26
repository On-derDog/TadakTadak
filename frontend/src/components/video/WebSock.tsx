import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const WebSock = () => {
  useEffect(() => {
    const access = 'your_access_token';

    const stomp = new Client({
      brokerURL: 'ws://localhost:8080/chat',
      connectHeaders: {
        Authorization: `Bearer ${access}`,
      },
      debug: (str: string) => {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stomp.onConnect = () => {
      console.log('Connected to WebSocket');
      stomp.deactivate();
    };

    stomp.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    stomp.onWebSocketClose = () => {
      console.log('WebSocket closed');
    };

    stomp.activate();

    return () => {
      if (stomp.connected) {
        stomp.deactivate();
      }
    };
  }, []);

  return null;
};

export default WebSock;