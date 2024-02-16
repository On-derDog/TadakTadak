// ChatRoomInfo.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import RoomName from './RoomName';
import RoomMember from './RoomMember';
import { UserInfoStore } from '../../stores/UserInfoStore';

interface RoomInfo {
	roomName: string;
	participation: number;
	owner: string;
	chatMemberResponses: { username: string }[];
}

const ChatRoomInfo: React.FC = () => {
	const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
	const { roomId } = useParams<{ roomId: string }>();
	const [isOwner, setIsOwner] = useState(false);

	const userInfo = UserInfoStore();

	useEffect(() => {
		fetchRoomInfo();
	}, [roomId, userInfo.email]);

	const fetchRoomInfo = async () => {
		try {
			const response = await fetch(`http://localhost:8002/chatroom-service/rooms/${roomId}`, {
				method: 'GET',
			});
			const data: RoomInfo = await response.json();
			setRoomInfo(data);
			setIsOwner(userInfo.email === data.owner);
		} catch (error) {
			console.error('Error fetching room info:', error);
			// test 더미데이터
			setRoomInfo({
				roomName: 'Sample Room',
				participation: 3,
				owner: 'John Doe',
				chatMemberResponses: [{ username: 'Alice' }, { username: 'Bob' }, { username: 'Charlie' }],
			});
		}
	};

	return (
		<ChatRoomInfoWrapper>
			<UpWrapper>
				{roomInfo && (
					<RoomName roomName={roomInfo.roomName} participation={roomInfo.participation} />
				)}
			</UpWrapper>
			<DownWrapper>
				{roomInfo && (
					<RoomMember
						owner={roomInfo.owner}
						chatMemberResponses={roomInfo.chatMemberResponses}
						isOwner={isOwner}
					/>
				)}
			</DownWrapper>
		</ChatRoomInfoWrapper>
	);
};

export default ChatRoomInfo;

const ChatRoomInfoWrapper = styled.div``;
const UpWrapper = styled.div``;
const DownWrapper = styled.div``;
