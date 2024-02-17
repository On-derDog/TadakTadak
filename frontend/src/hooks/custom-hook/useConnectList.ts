import { useRef } from 'react';
import * as StompJs from '@stomp/stompjs';
import { useUserListStore } from '../../stores/useUserListStore';
import { bodyMessage } from '../../interface/CommonInterface';
import { UserList } from '../../interface/UserListInterface';
import { StompClient } from '../../interface/ChatInterface';

export const useConnectList = () => {
	const { setUserList } = useUserListStore();
	const client = useRef<StompClient | null>(null);

	const listConnect = () => {
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

	const listUnconnect = () => {
		if (client.current && client.current.deactivate) {
			client.current.deactivate();
		}
	};

	const userSubscribe = () => {
		if (client.current) {
			client.current.subscribe('/topic/users', (userlist: bodyMessage) => {
				const receivedUserMap = JSON.parse(userlist.body);
				const userListArray: UserList[] = Object.keys(receivedUserMap).map((key) => ({
					username: key,
					roomName: receivedUserMap[key].roomName,
				}));
				setUserList(userListArray);
			});
		}
	};

	const publishUser = (username: string, roomName: string): UserList => {
		if (client.current && username.trim() !== '') {
			const users: UserList = {
				username: username,
				roomName: roomName,
			};
			client.current.publish({
				destination: '/app/users',
				body: JSON.stringify(users),
			});
			return users;
		}
		throw new Error('Failed to publish user: username is empty');
	};

	return { listConnect, publishUser, listUnconnect, userSubscribe };
};
