import { listDataProps } from '../../interface/UserListInterface';
import { ChattingRoomHeader } from '../../styles/ComponentLayout';
import List from './List';
import styled from '@emotion/styled';

const UserList = ({ username, roomName }: listDataProps) => {
  return (
    <UserListContainer>
      <ListHeader>커뮤니티</ListHeader>
      <List username={username} roomName={roomName} />
    </UserListContainer>
  );
};

export default UserList;

const UserListContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 5px 5px 0px 0px;
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  /* border: 1px solid var(--color-rangoongreen); */
`;

const ListHeader = styled.header`
  ${ChattingRoomHeader}
  width: calc(100% - 1.25rem);
  height: 0.8125rem;
  padding: 0.5rem 0.625rem 0.5rem 0.625rem;
  font-size: var(--font-size-xxs);
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
`;
