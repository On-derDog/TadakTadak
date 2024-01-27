import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp, Client, Message } from '@stomp/stompjs';
import Chat from './Chat';
import ChatRecent from './ChatRecent';
import useChatStore from '../../stores/useChatStore';

const ChatForm: React.FC = () => {
	const { inputMessage, setInputMessage, handleSendMessage } = useChatStore();
	let stompClient: Client | null = null;

	useEffect(() => {
		stompClient = new Client({
			webSocketFactory: () => new SockJS('http://localhost:8010/ws'),
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
				stompClient.subscribe('/topic/public', (message: Message) => {
					console.log('Received message:', message.body);
				});
			}
		};

		stompClient.onStompError = (frame) => {
			console.error('Error connecting to WebSocket:', frame);
		};

		stompClient.activate();

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
