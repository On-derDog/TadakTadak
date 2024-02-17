import { useRef } from 'react';
import * as StompJs from '@stomp/stompjs';
import { bodyMessage } from '../../interface/CommonInterface';
import { StompClient } from '../../interface/ChatInterface';
import { useChatStore } from '../../stores/useChatStore';

export const useConnectChatRoom = () => {
	const { inputMessage, setMessages, setInputMessage } = useChatStore();
	const client = useRef<StompClient | null>(null);

	const chatConnect = (username: string, chatroomId: string) => {
		if (!username || username.trim() === '') {
			throw new Error('Invalid username');
		}

		if (client.current) {
			client.current.deactivate();
		}
		client.current = new StompJs.Client({
			brokerURL: 'ws://localhost:8010/ws',
			onConnect: () => {
				console.log('success');
				// userSubscribe();
				chatSubscribe(chatroomId);
				// console.log(username);
				// publishUser(username, roomName);
			},
			debug: (str: string) => {
				console.log(str);
			},
			reconnectDelay: 5000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
		});
		client.current.activate();
	};

	const chatSubscribe = (chatroomId: string) => {
		if (client.current) {
			client.current.subscribe(`/topic/public/${chatroomId}`, (message: bodyMessage) => {
				const receivedMessage = JSON.parse(message.body);
				setMessages((prevMessages) => [
					...prevMessages,
					{
						content: receivedMessage.content,
						sender: receivedMessage.sender,
						createdAt: receivedMessage.createdAt,
					},
				]);
			});
		}
	};

	const sendMessage = (username: string, chatroomId: string) => {
		if (client.current && inputMessage.trim() !== '') {
			const message = {
				content: inputMessage,
				sender: username,
				type: 'CHAT',
			};
			client.current.publish({
				destination: `/app/chat/${chatroomId}/send-message`,
				body: JSON.stringify(message),
			});

			setInputMessage('');
		}
	};

	return { chatConnect, chatSubscribe, sendMessage };
};
