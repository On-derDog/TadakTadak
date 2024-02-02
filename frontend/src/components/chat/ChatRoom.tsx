import ChatForm from './ChatForm';
import styled from '@emotion/styled';

const ChatRoom: React.FC = () => {
	return (
		<ChattingRoom>
			<ChattingRoomHeader>채팅방</ChattingRoomHeader>
			<ChatForm />
		</ChattingRoom>
	);
};

const ChattingRoom = styled.div`
	width: calc(100% - 1rem);
	height: 100%;
	margin: 0.5rem 0rem 0.5rem 0rem;
	background-color: var(--color-rangoongreen);
	display: flex;
	flex-direction: column;
	/* border: 1px solid var(--color-rangoongreen); */
`;

const ChattingRoomHeader = styled.header`
	width: 100%;
	height: 3.125rem;
	background-color: var(--color-pumpkin);
	color: var(--color-white);
	border-radius: 5px 5px 0px 0px;
	font-size: var(--font-size-md);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export default ChatRoom;
