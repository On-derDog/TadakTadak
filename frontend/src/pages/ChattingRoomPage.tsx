// import Layout from '../components/layout/Layout';
import { Container, Wrapper, SideWrapper, MainWrapper } from '../styles/Layout';
import styled from '@emotion/styled';
import ChatRoom from '../components/chat/ChatRoom';
import UserList from '../components/user/UserList';

const ChattingRoomPage = () => {
	return (
		<Container>
			<Wrapper>
				<SideWrapper>채팅방이름</SideWrapper>
				<MainWrapper>
					<VideoWrapper>비디오</VideoWrapper>
					<ChatWrapper>
						<ChatRoom />
					</ChatWrapper>
				</MainWrapper>
				<SideWrapper>
					<UserList />
				</SideWrapper>
			</Wrapper>
		</Container>
	);
};

export default ChattingRoomPage;

export const VideoWrapper = styled.div`
	width: 50%;
	height: 100%;
	background-color: lightblue;
`;

export const ChatWrapper = styled.div`
	width: calc(50% - 1rem);
	height: calc(100% - 1rem);
	background-color: var(--color-shark);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0.5rem;
`;
