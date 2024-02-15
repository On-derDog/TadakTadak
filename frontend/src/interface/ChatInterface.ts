import * as StompJs from '@stomp/stompjs';

export interface Message {
	content: string;
	sender: string;
	createdAt: Date | string;
}

export type StompClient = StompJs.Client;
