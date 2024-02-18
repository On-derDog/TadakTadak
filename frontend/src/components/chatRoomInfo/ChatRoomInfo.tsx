import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import RoomName from './RoomName';
import RoomMember from './RoomMember';
import { useRoomInfoStore } from '../../stores/useRoomInfoStore';
import { listDataProps } from '../../interface/UserListInterface';
import { UserInfoStore } from '../../stores/UserInfoStore';

const ChatRoomInfo = ({ roomName }: listDataProps) => {
	const { setRoomInfo, owner, fetchInitialRoomIn, setFetchInitialRoomIn } = useRoomInfoStore();
	const { chatroom_id } = useParams();
	const [refreshIntervalId, setRefreshIntervalId] = useState<number>();
	const userInfo = UserInfoStore();
	const userId = userInfo.username;

	useEffect(() => {
		fetchRoomInfo();

		const intervalId = setInterval(fetchRoomInfo, 5000);
		setRefreshIntervalId(intervalId);

		return () => clearInterval(intervalId);
	}, [chatroom_id, owner]);

	useEffect(() => {
		if (fetchInitialRoomIn) {
			fetchRoomIn();
			console.log('ChatRoom 입장');
			setFetchInitialRoomIn(false);
			console.log('ChatRoom 입장 API 1회 호출');
			fetchRoomInfo();
		} else {
			console.log('ChatRoom 입장 API 호출 불가능');
		}
	}, []);

	const fetchRoomIn = async () => {
		try {
			const apiUrl = `http://localhost:8002/chatroom-service/rooms/${chatroom_id}`;
			fetch(apiUrl, {
				method: 'POST',
				body: JSON.stringify(userId),
				headers: {
					'Content-Type': 'application/json',
				},
			});
		} catch (error) {
			console.error('Error fetching room in:', error);
		}
	};

	const fetchRoomInfo = async () => {
		try {
			const apiUrl = `http://localhost:8002/chatroom-service/rooms/${chatroom_id}`;
			fetch(apiUrl, {
				method: 'POST',
				body: JSON.stringify(userId),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const response = await fetch(`http://localhost:8002/chatroom-service/rooms/${chatroom_id}/roomInformation`, {
				method: 'GET',
			});
			const data = await response.json();
			setRoomInfo(data);

			// test 더미데이터
			// setRoomInfo({
			// 	roomName: 'Sample Room',
			// 	participation: 3,
			// 	owner: 'John Doe',
			// 	chatMemberResponses: [{ username: 'Alice' }, { username: 'Bob' }, { username: 'Charlie' }],
			// });
		} catch (error) {
			console.error('Error fetching room info:', error);
		}
	};

	return (
		<ChatRoomInfoWrapper>
			<UpWrapper>
				<RoomName roomName={roomName} username={undefined} />
			</UpWrapper>
			<DownWrapper>
				<RoomMember />
			</DownWrapper>
		</ChatRoomInfoWrapper>
	);
};

export default ChatRoomInfo;

const ChatRoomInfoWrapper = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 0px 0px 5px 5px;
	display: flex;
	flex-direction: column;
	background-color: var(--color-white);
`;
const UpWrapper = styled.div`
	background-color: var(--color-pumpkin);
	color: var(--color-white);
	border-radius: 0px 5px 0px 0px;
`;
const DownWrapper = styled.div`
	background-color: var(--color-white);
	border-radius: 0px 0px 5px 0px;
`;
