import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const WebSock = () => {
  useEffect(() => {
    const access = 'your_access_token';

    const stomp = new Client({
      brokerURL: 'ws://localhost:8080/stomp/signal',
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

      const signalMessage = {
        fromUserId: '1',
        type: 'ice',
        roomId: '1',
        candidate: null,
        sdp: null,
      };

      // Publish
      stomp.publish({
        destination: '/pub/join',
        body: JSON.stringify(signalMessage),
      });

      // Subscribe
      const subscription = stomp.subscribe('/sub/1', (message) => {
        console.log('Received message:', message.body);
      });
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
