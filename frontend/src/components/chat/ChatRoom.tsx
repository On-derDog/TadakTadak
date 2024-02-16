import ChatForm from './ChatForm';
import styled from '@emotion/styled';
import { ChattingRoomHeader } from '../../styles/ComponentLayout';
import { UserDataProps } from '../../interface/UserListInterface';

const ChatRoom = ({ username, isLoading, isError }: UserDataProps) => {
	return (
		<ChattingRoom>
			<ChatHeader>채팅방</ChatHeader>
			<ChatForm username={username} isLoading={isLoading} isError={isError} />
		</ChattingRoom>
	);
};

export default ChatRoom;

const ChattingRoom = styled.div`
	width: 100%;
	height: 100%;
	background-color: var(--color-rangoongreen);
	display: flex;
	flex-direction: column;
	/* border: 1px solid var(--color-rangoongreen); */
`;

const ChatHeader = styled.header`
	${ChattingRoomHeader}
	width: 100%;
	height: 3.125rem;
	font-size: var(--font-size-md);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;
