// import Layout from '../components/layout/Layout';
import { Container, Wrapper, SideWrapper, MainWrapper } from '../styles/Layout';
import styled from '@emotion/styled';

const ChattingRoomPage = () => {
	return (
		<Container>
			<Wrapper>
				<SideWrapper>채팅방이름</SideWrapper>
				<MainWrapper>
					<VideoWrapper>비디오</VideoWrapper>
					<ChatWrapper>채팅</ChatWrapper>
				</MainWrapper>
				<SideWrapper>인원 목록</SideWrapper>
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
	width: 50%;
	height: 100%;
	background-color: lightgreen;
`;
