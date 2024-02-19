import styled from '@emotion/styled';
import ChatMessage from './ChatMessage';

import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useChatStore } from '../../stores/useChatStore';
import { ColumnDisplay, OverFlowScrollbar } from '../../styles/ComponentLayout';
import { FlexCenterWrapper } from '../../styles/Layout';
import { UserDataProps } from '../../interface/UserListInterface';
import { useConnectChatRoom } from '../../hooks/custom-hook/useConnectChatRoom';

const ChatForm = ({ isLoading, isError, username }: UserDataProps) => {
	const { messages, inputMessage, setInputMessage } = useChatStore();
	const { chatroom_id } = useParams<{ chatroom_id: string }>();
	const roomId = chatroom_id ?? '';
	const { chatConnect, sendMessage } = useConnectChatRoom();

	useEffect(() => {
		if (!isLoading && !isError && username) {
			chatConnect(username, roomId);
		}
	}, [isLoading, isError]);

	// console.log(username);
	// console.log(messages);

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
							if (username && chatroom_id) {
								sendMessage(username, chatroom_id);
							}
						}
					}}
				/>
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
