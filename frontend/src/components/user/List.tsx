// import * as StompJs from '@stomp/stompjs';
import styled from '@emotion/styled';
import UserProfile from './UserProfile';

import { ColumnDisplay, OverFlowScrollbar } from '../../styles/ComponentLayout';
import { useUserListStore } from '../../stores/useUserListStore';
import { useLoginWebSocket } from '../../hooks/custom-hook/useLoginWebSocket';
import { listDataProps } from '../../interface/UserListInterface';
import { useEffect } from 'react';

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
