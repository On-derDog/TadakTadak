import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import RoomName from './RoomName';
import RoomMember from './RoomMember';
import { useRoomInfoStore } from '../../stores/useRoomInfoStore';

const ChatRoomInfo: React.FC = () => {
	const { setRoomInfo, owner } = useRoomInfoStore();
	const { chatroom_id } = useParams();
	const [refreshIntervalId, setRefreshIntervalId] = useState<number>();

	useEffect(() => {
		fetchRoomInfo();

		const intervalId = setInterval(fetchRoomInfo, 5000);
		setRefreshIntervalId(intervalId);

		return () => clearInterval(intervalId);
	}, [chatroom_id, owner]);

	const fetchRoomInfo = async () => {
		try {
			const response = await fetch(
				`http://localhost:8002/chatroom-service/rooms/${chatroom_id}/information`,
				{
					method: 'GET',
				},
			);
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
				<RoomName />
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
	/* border: 1px solid var(--color-rangoongreen); */
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
