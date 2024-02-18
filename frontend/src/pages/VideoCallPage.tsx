// import Layout from '../components/layout/Layout';
import { Container, Wrapper, SideWrapper, MainWrapper } from '../styles/Layout';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../hooks/react-query/useUserData';
import { useParams } from 'react-router-dom';
import VideoCall from '../components/video/VideoCall';

const VideoCallPage = () => {
	const accessToken = localStorage.getItem('Accesstoken');
	const isLoggedIn = accessToken !== null;
	const { chatroom_id } = useParams<{ chatroom_id: string }>();
	const roomId = chatroom_id ?? '';
	const {
		data: userData,
		isLoading: isLoading,
		isError: isError,
	} = useQuery({
		queryKey: ['userData'],
		queryFn: getUserData,
		staleTime: 5000,
		enabled: isLoggedIn,
	});
	let username = userData?.username;

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error fetching user data</div>;

	return (
		<Container>
			<Wrapper>
				<SideWrapper></SideWrapper>
				<MainWrapper>
					<VideoWrapper>
						<VideoCall />
					</VideoWrapper>
					<ChatWrapper></ChatWrapper>
				</MainWrapper>
				<SideWrapper></SideWrapper>
			</Wrapper>
		</Container>
	);
};

export default VideoCallPage;

export const VideoWrapper = styled.div`
	width: calc(50% - 1rem);
	height: calc(100% - 1rem);
	background-color: var(--color-white);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 0.5rem;
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
