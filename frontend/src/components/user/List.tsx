import * as StompJs from '@stomp/stompjs';
import styled from '@emotion/styled';
import UserProfile from './UserProfile';

import { ColumnDisplay, OverFlowScrollbar } from '../../styles/ComponentLayout';
import { useUserListStore } from '../../stores/useUserListStore';
// import { useChatStore } from '../../stores/useChatStore';
import { useRef, useEffect } from 'react';
import { bodyMessage } from '../../interface/CommonInterface';
import { UserDataProps } from '../../interface/UserListInterface';

type StompClient = StompJs.Client;

const List = ({ isLoading, isError, username }: UserDataProps) => {
	// const { id, setId } = useChatStore();
	const { userlist, setUserList } = useUserListStore();

	const client = useRef<StompClient | null>(null);

	const connect = () => {
		if (client.current) {
			client.current.deactivate();
		}
		client.current = new StompJs.Client({
			brokerURL: 'ws://localhost:8010/ws',
			onConnect: () => {
				console.log('success');
				userSubscribe();
			},
			debug: (str: string) => {
				console.log(str);
			},
			reconnectDelay: 5000,
			heartbeatIncoming: 4000,
			heartbeatOutgoing: 4000,
		});

		client.current.activate();
	};

	useEffect(() => {
		if (!isLoading && !isError) {
			connect();
		}
	}, [isLoading, isError]);

	const userSubscribe = () => {
		if (client.current) {
			const users = {
				userName: username,
			};

			client.current.publish({
				destination: '/app/users',
				body: JSON.stringify(users),
			});

			client.current.subscribe('/topic/users', (userlist: bodyMessage) => {
				const receivedUserList = JSON.parse(userlist.body);
				setUserList((prevUserList) => [
					...prevUserList,
					{
						userName: receivedUserList.userName,
					},
				]);
			});
		}
	};

	// const connectId = () => {
	// 	connect();

	// 	return () => {
	// 		if (client.current) {
	// 			client.current.deactivate();
	// 		}
	// 	};
	// };

	return (
		<ChatWrapper>
			<UserProfile userlist={userlist} />
			{/* <div>
				<input type="text" value={id} onChange={(e) => setId(e.target.value)} />
				<button onClick={connectId}>Connect</button>
			</div> */}
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
