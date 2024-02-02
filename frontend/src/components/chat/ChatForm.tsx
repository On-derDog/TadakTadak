import { useRef } from 'react';
import * as StompJs from '@stomp/stompjs';
import { useChatStore } from '../../stores/useChatStore';
import styled from '@emotion/styled';
import ChatMessage from './ChatMessage';

type StompClient = StompJs.Client;

const ChatForm = () => {
	const { id, messages, inputMessage, setId, setMessages, setInputMessage } = useChatStore();
	const client = useRef<StompClient | null>(null);

	const connect = () => {
		if (client.current) {
			client.current.deactivate();
		}
		client.current = new StompJs.Client({
			brokerURL: 'ws://localhost:8010/ws',
			onConnect: () => {
				console.log('success');
				subscribe();
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

	const subscribe = () => {
		if (client.current) {
			client.current.subscribe('/topic/public/5', (message: any) => {
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

	const connectId = () => {
		connect();

		return () => {
			if (client.current) {
				client.current.deactivate();
			}
		};
	};

	const sendMessage = () => {
		if (client.current && inputMessage.trim() !== '') {
			const message = {
				content: inputMessage,
				sender: id,
				type: 'CHAT',
			};

			client.current.publish({
				destination: '/app/chat/5/send-message',
				body: JSON.stringify(message),
			});

			setInputMessage('');
		}
	};

	return (
		<ChatWrapper>
			<ChattingContainer>
				<ChatMessage /*messages={messages}*/ />
				{/* <ul>
					{messages.map((msg, index) => (
						<li key={index}>
							<strong>{msg.sender} : </strong>
							{msg.content}
						</li>
					))}
				</ul> */}
			</ChattingContainer>
			<InputContainer>
				<input
					type="text"
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
					onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
						if (e.key === 'Enter') {
							sendMessage();
						}
					}}
				/>
				<div>
					<input type="text" value={id} onChange={(e) => setId(e.target.value)} />
					<button onClick={connectId}>Connect</button>
				</div>
			</InputContainer>
		</ChatWrapper>
	);
};

export default ChatForm;

const InputContainer = styled.footer`
	width: 100%;
	height: 4rem;
`;

const ChattingContainer = styled.section`
	width: 100%;
	height: 100%;
	background-color: var(--color-white);
	overflow: auto;

	&::-webkit-scrollbar {
		width: 0.5rem;
	}

	&::-webkit-scrollbar-thumb {
		background-color: var(--color-crusta);
		border-radius: 0.25rem;
	}

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar-thumb:hover {
		background-color: var(--color-pumpkin);
	}
`;

const ChatWrapper = styled.div`
	height: calc(100% - 3.125rem);
	display: flex;
	flex-direction: column;
`;
