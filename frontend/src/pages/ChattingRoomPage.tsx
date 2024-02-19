import { useParams } from 'react-router-dom';

import { Container, Wrapper, SideWrapper, MainWrapper } from '../styles/Layout';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import ChatRoom from '../components/chat/ChatRoom';
import ChatRoomInfo from '../components/chatRoomInfo/ChatRoomInfo';
import UserList from '../components/user/UserList';
import VideoCall from '../components/video/VideoCall';

import { getRoomName } from '../hooks/react-query/useGetRoomNames';
import { getUserData } from '../hooks/react-query/useUserData';

const ChattingRoomPage = () => {
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

  const {
    data: roomData,
    isLoading: isroomDataLoading,
    isError: isroomDataError,
  } = useQuery({
    queryKey: ['roomData'],
    queryFn: () => getRoomName(roomId),
    staleTime: 5000,
    enabled: isLoggedIn,
  });
  let roomName = roomData?.roomName;

  if (isLoading) return <div>Loading...</div>;
  if (isroomDataLoading) return <div>Get Some Room Data ...</div>;
  if (isError) return <div>Error fetching user data</div>;
  if (isroomDataError) return <div>Error fetching roomName data</div>;

  return (
    <Container>
      <Wrapper>
        <SideWrapper>
          <ChatRoomInfo roomName={roomName} username={undefined} />
        </SideWrapper>
        <MainWrapper>
          <VideoWrapper>
            <VideoCall />
          </VideoWrapper>
          <ChatWrapper>
            <ChatRoom
              username={username}
              isLoading={isLoading}
              isError={isError}
            />
          </ChatWrapper>
        </MainWrapper>
        <SideWrapper>
          <UserList username={username} roomName={roomName} />
        </SideWrapper>
      </Wrapper>
    </Container>
  );
};

export default ChattingRoomPage;

export const VideoWrapper = styled.div`
  width: calc(50% - 1rem);
  height: calc(100% - 1rem);
  background-color: var(--color-shark);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
