import * as StompJs from '@stomp/stompjs';
import styled from '@emotion/styled';
import ChatMessage from './ChatMessage';

import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useChatStore } from '../../stores/useChatStore';
import { ColumnDisplay, OverFlowScrollbar } from '../../styles/ComponentLayout';
<<<<<<< HEAD
import { FlexCenterWrapper } from '../../styles/Layout';
import { bodyMessage } from '../../interface/CommonInterface';
import { UserDataProps } from '../../interface/UserListInterface';
import { StompClient } from '../../interface/ChatInterface';
=======
import { bodyMessage } from '../../interface/CommonInterface';
>>>>>>> cc8b37f (Feat: Message Body Type 추가)

const ChatForm = ({ isLoading, isError, username }: UserDataProps) => {
	const { messages, inputMessage, setMessages, setInputMessage } = useChatStore();
	const { chatroom_id } = useParams();
	const client = useRef<StompClient | null>(null);

	useEffect(() => {
		if (!isLoading && !isError) {
			connect();
		}
	}, [isLoading, isError]);

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
<<<<<<< HEAD
			client.current.subscribe(`/topic/public/${chatroom_id}`, (message: bodyMessage) => {
=======
			client.current.subscribe('/topic/public/5', (message: bodyMessage) => {
>>>>>>> cc8b37f (Feat: Message Body Type 추가)
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

	const sendMessage = () => {
		if (client.current && inputMessage.trim() !== '') {
			const message = {
				content: inputMessage,
				sender: username,
				type: 'CHAT',
			};

			client.current.publish({
				destination: `/app/chat/${chatroom_id}/send-message`,
				body: JSON.stringify(message),
			});

			setInputMessage('');
		}
	};

	// const connectId = () => {
	// 	connect();

	// 	return () => {
	// 		if (client.current) {
	// 			client.current.deactivate();
	// 		}
	// 	};
	// };

	return (
		<ChatWrapper>
			<ChattingContainer>
				<ChatMessage messages={messages} username={username} />
			</ChattingContainer>
			<InputContainer>
				<ChatInput
					value={inputMessage}
					onChange={(e) => setInputMessage(e.target.value)}
					onKeyUp={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
						if (e.key === 'Enter') {
							sendMessage();
						}
					}}
				/>
				{/* <div>
					<input type="text" value={id} onChange={(e) => setId(e.target.value)} />
					<button onClick={connectId}>Connect</button>
				</div> */}
			</InputContainer>
		</ChatWrapper>
	);
};

export default ChatForm;

const InputContainer = styled.footer`
	width: 100%;
	height: 4rem;
	${FlexCenterWrapper}
	flex-direction: column;
	background-color: var(--color-shark);
`;

const ChattingContainer = styled.section`
	${OverFlowScrollbar}
	width: 100%;
	height: 100%;
	background-color: var(--color-white);
`;

const ChatWrapper = styled.div`
	${ColumnDisplay}
	height: calc(100% - 3.125rem);
`;

const ChatInput = styled.textarea`
	${OverFlowScrollbar}
	width: calc(100% - 6px);
	height: 100%;
	margin: 0.5rem 0rem 0rem 0rem;
	border: 3px solid var(--color-crusta);
	border-radius: 5px;
	resize: none;
	font-size: var(--font-size-sm);
`;
