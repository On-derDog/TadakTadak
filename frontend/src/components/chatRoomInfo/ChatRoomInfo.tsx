import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import RoomName from './RoomName';
import RoomMember from './RoomMember';
import { useRoomInfoStore } from '../../stores/useRoomInfoStore';
import { UserInfoStore } from '../../stores/UserInfoStore';

const ChatRoomInfo: React.FC = () => {
	const { setRoomInfo, setIsOwner, chatMemberResponses, owner } = useRoomInfoStore();
	const { chatroom_id } = useParams();

	const userInfo = UserInfoStore();

	useEffect(() => {
		fetchRoomInfo();
	}, [chatroom_id, chatMemberResponses, owner]);

	const fetchRoomInfo = async () => {
		try {
			// const response = await fetch(`http://localhost:8002/chatroom-service/rooms/${roomId}`, {
			// 	method: 'GET',
			// });
			// const data = await response.json();
			// setRoomInfo(data);
			// setIsOwner(userInfo.email === data.owner);

			// test 더미데이터
			setRoomInfo({
				roomName: 'Sample Room',
				participation: 3,
				owner: 'John Doe',
				chatMemberResponses: [{ username: 'Alice' }, { username: 'Bob' }, { username: 'Charlie' }],
			});
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

const ChatRoomInfoWrapper = styled.div``;
const UpWrapper = styled.div``;
const DownWrapper = styled.div``;
