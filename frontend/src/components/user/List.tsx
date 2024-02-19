// import * as StompJs from '@stomp/stompjs';
import { useEffect } from 'react';

import { listDataProps } from '../../interface/UserListInterface';
import { ColumnDisplay, OverFlowScrollbar } from '../../styles/ComponentLayout';
import UserProfile from './UserProfile';
import styled from '@emotion/styled';

import { useLoginWebSocket } from '../../hooks/custom-hook/useLoginWebSocket';

import { useUserListStore } from '../../stores/useUserListStore';

const List = ({ username, roomName }: listDataProps) => {
  const { connect, unconnect } = useLoginWebSocket();
  useEffect(() => {
    if (username && roomName) {
      connect(username, roomName);
    }
    return () => {
      unconnect();
    };
  }, []);

  const { userlist } = useUserListStore();
  console.log(userlist);

  return (
    <ChatWrapper>
      <UserProfile userlist={userlist} />
    </ChatWrapper>
  );
};

export default List;

const ChatWrapper = styled.div`
  ${ColumnDisplay}
  ${OverFlowScrollbar}
	height: calc(100% - 0.8125rem);
  overflow: auto;
`;
