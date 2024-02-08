import * as StompJs from '@stomp/stompjs';
import styled from '@emotion/styled';
import UserProfile from './UserProfile';

import { ColumnDisplay, OverFlowScrollbar } from '../../styles/ComponentLayout';
import { useUserListStore } from '../../stores/useUserListStore';
import { useChatStore } from '../../stores/useChatStore';
import { useRef } from 'react';

type StompClient = StompJs.Client;

const Users = () => {
	const { id, setId } = useChatStore();
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
				testSubscribe();
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

	const connectId = () => {
		connect();

		return () => {
			if (client.current) {
				client.current.deactivate();
			}
		};
	};

	const testSubscribe = () => {
		if (client.current) {
			const users = {
				userName: id,
			};

			client.current.publish({
				destination: '/app/users',
				body: JSON.stringify(users),
			});

			client.current.subscribe('/topic/users', (userlist: any) => {
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

	return (
		<ChatWrapper>
			<UserProfile userlist={userlist} />
			<div>
				<input type="text" value={id} onChange={(e) => setId(e.target.value)} />
				<button onClick={connectId}>Connect</button>
			</div>
		</ChatWrapper>
	);
};

export default Users;

const ChatWrapper = styled.div`
	${ColumnDisplay}
	${OverFlowScrollbar}
	height: calc(100% - 0.8125rem);
	overflow: auto;
`;
