import { useEffect } from 'react';
import { Client, Message } from '@stomp/stompjs';
import Chat from './Chat';
import ChatRecent from './ChatRecent';
import useChatStore from '../../stores/useChatStore';

const ChatForm = () => {
	const { inputMessage, setInputMessage, handleSendMessage } = useChatStore();
	let stompClient: Client;

	const connect = () => {
		stompClient = new Client({
			webSocketFactory: () => new WebSocket('ws://localhost:8010/ws'),
			debug: (str) => {
				console.log(str);
			},
			reconnectDelay: 5000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
		});

		stompClient.onConnect = (frame) => {
			console.log('Connected: ' + frame);

			if (stompClient && stompClient.connected) {
				stompClient.subscribe('/topic/public/5', (message: Message) => {
					const receivedMessage = JSON.parse(message.body);
					console.log('Received message:', receivedMessage);

					if (receivedMessage.type === 'JOIN') {
						console.log(
							`${receivedMessage.sender} 님이 채팅방에 참여하셨습니다.`,
						);
					} else {
						console.log('Regular chat message:', receivedMessage.body);
					}
				});

				stompClient.publish({
					destination: '/app/chat/5/enter',
					body: JSON.stringify({ type: 'JOIN', sender: 'username' }),
				});
			}
		};

		stompClient.onStompError = (frame) => {
			console.error('Error connecting to WebSocket:', frame);
		};

		stompClient.activate();
	};

	useEffect(() => {
		connect();

		return () => {
			stompClient?.deactivate();
		};
	}, []);


	return (
		<>
			<ChatRecent />
			<Chat />

			<div>
				<input
					type="text"
					value={inputMessage}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setInputMessage(e.target.value)
					}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
						if (e.key === 'Enter') {
							handleSendMessage();
						}
					}}
					placeholder="채팅을 입력해주세요"
				/>
			</div>
		</>
	);
};

export default ChatForm;
