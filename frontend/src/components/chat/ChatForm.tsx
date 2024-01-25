import useChatStore from '../../stores/useChatStore';
import Chat from './Chat';
import ChatRecent from './ChatRecent';
import { useEffect } from 'react';
import { enterChatRoom } from '../../hooks/ChatWebSocket';
import { useQuery } from '@tanstack/react-query';
import Stomp from 'stompjs';

const ChatForm: React.FC = () => {
	const { inputMessage, setInputMessage, handleSendMessage } = useChatStore();
	const {
		data: stompClient,
		isLoading,
		isError,
		error,
	} = useQuery<Stomp.Client>({
		queryKey: ['chats'],
		queryFn: enterChatRoom,
	});

	let content;

	if (isLoading) {
		content = <div>Loading...</div>;
	}

	if (isError) {
		console.error('Error connecting to the chat room:', error);
		content = <div>Error: {error.message || 'Failed to connect'}</div>;
	}

	useEffect(() => {
		if (stompClient) {
			console.log('Data loaded successfully:');
		}
		return () => {
			stompClient?.disconnect(() => {
				console.log('Disconnected from the chat room!');
			});
		};
	}, [stompClient]);

	return (
		<>
			<ChatRecent />
			<Chat />
			{content}
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
