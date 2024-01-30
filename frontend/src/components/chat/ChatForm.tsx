import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as StompJs from '@stomp/stompjs';
import ChatRecent from './ChatRecent';

interface ChatMessage {
	applyId: string;
	chat: string;
}

const ChatForm = () => {
	const [chatList, setChatList] = useState<ChatMessage[]>([]);
	const [chat, setChat] = useState<string>('');

	const { apply_id } = useParams<{ apply_id: string }>();
	const client = useRef<StompJs.Client | null>(null);

	const newChatMessage: ChatMessage = {
		applyId: 'User',
		chat,
	};

	const connect = () => {
		client.current = new StompJs.Client({
			brokerURL: 'ws://localhost:8010/ws',
			onConnect: () => {
				console.log('success');
				subscribe();
			},
			debug: (str) => {
				console.log(str);
			},
			reconnectDelay: 5000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
		});
		client.current.activate();
	};

	const publish = (chat: string) => {
		if (!client.current || !client.current.connected) return;

		client.current.publish({
			destination: '/app/chat/5/send-message',
			body: JSON.stringify({
				applyId: apply_id,
				chat: chat,
			}),
		});
		setChatList((prevChatList) => [...prevChatList, newChatMessage]);
		setChat('');
	};

	const subscribe = () => {
		if (!client.current) return;

		client.current.subscribe(`/topic/public/5`, (body) => {
			console.log('Received message:', body);
		});
	};

	const disconnect = () => {
		if (!client.current) return;

		client.current.deactivate();
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChat(event.target.value);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			publish(chat);
		}
	};

	useEffect(() => {
		connect();

		return () => disconnect();
	}, []);

	return (
		<div>
			<ChatRecent />
			<div className={'chat-list'}>
				{chatList.map((chatMessage, index) => (
					<div key={index}>{`${chatMessage.applyId}: ${chatMessage.chat}`}</div>
				))}
			</div>
			<div>
				<input
					type={'text'}
					name={'chatInput'}
					onChange={handleChange}
					value={chat}
					placeholder="채팅을 입력해주세요"
					onKeyDown={handleKeyDown}
				/>
			</div>
		</div>
	);
};

export default ChatForm;
