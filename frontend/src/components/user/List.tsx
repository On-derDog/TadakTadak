// import * as StompJs from '@stomp/stompjs';
import styled from '@emotion/styled';
import UserProfile from './UserProfile';

import { ColumnDisplay, OverFlowScrollbar } from '../../styles/ComponentLayout';
import { useUserListStore } from '../../stores/useUserListStore';
// import { useRef, useEffect } from 'react';
// import { bodyMessage } from '../../interface/CommonInterface';
// import { UserDataProps } from '../../interface/UserListInterface';

// type StompClient = StompJs.Client;

const List = () => {
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
