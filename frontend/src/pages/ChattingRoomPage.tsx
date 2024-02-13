// import Layout from '../components/layout/Layout';
import { Container, Wrapper, SideWrapper, MainWrapper } from '../styles/Layout';
import styled from '@emotion/styled';
import ChatRoom from '../components/chat/ChatRoom';
import UserList from '../components/user/UserList';

import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../hooks/react-query/useUserData';

const ChattingRoomPage = () => {
	const {
		data: userData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['userData'],
		queryFn: getUserData,
		staleTime: 2000000,
	});
	let username = userData?.username;

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error fetching user data</div>;

	return (
		<Container>
			<Wrapper>
				<SideWrapper>채팅방이름</SideWrapper>
				<MainWrapper>
					<VideoWrapper>비디오</VideoWrapper>
					<ChatWrapper>
						<ChatRoom username={username} isLoading={isLoading} isError={isError} />
					</ChatWrapper>
				</MainWrapper>
				<SideWrapper>
					<UserList username={username} isLoading={isLoading} isError={isError} />
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
