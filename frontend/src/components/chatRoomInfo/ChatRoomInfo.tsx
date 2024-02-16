import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import RoomName from './RoomName';
import RoomMember from './RoomMember';

interface RoomInfo {
	roomName: string;
	participation: number;
	owner: string;
	chatMemberResponses: { username: string }[];
}

const ChatRoomInfo: React.FC = () => {
	const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);

	useEffect(() => {
		fetchRoomInfo();
	}, []);

	const fetchRoomInfo = async () => {
		try {
			const response = await fetch('http://localhost:8002/chatroom-service/rooms/1', {
				method: 'GET',
			});
			const data: RoomInfo = await response.json();
			setRoomInfo(data);
		} catch (error) {
			console.error('Error fetching room info:', error);
			// test 더미데이터
			// setRoomInfo({
			// 	roomName: 'Sample Room',
			// 	participation: 3,
			// 	owner: 'John Doe',
			// 	chatMemberResponses: [{ username: 'Alice' }, { username: 'Bob' }, { username: 'Charlie' }],
			// });
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
					<RoomMember owner={roomInfo.owner} chatMemberResponses={roomInfo.chatMemberResponses} />
				)}
			</DownWrapper>
		</ChatRoomInfoWrapper>
	);
};

export default ChatRoomInfo;

const ChatRoomInfoWrapper = styled.div``;
const UpWrapper = styled.div``;
const DownWrapper = styled.div``;
