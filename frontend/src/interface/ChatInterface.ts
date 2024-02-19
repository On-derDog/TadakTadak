import * as StompJs from '@stomp/stompjs';

export interface Message {
  content: string;
  username: string;
  createdAt: Date | string;
}

export type StompClient = StompJs.Client;
