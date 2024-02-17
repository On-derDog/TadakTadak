import styled from '@emotion/styled';
import { useRoomInfoStore } from '../../stores/useRoomInfoStore';

const RoomName: React.FC = () => {
	const { roomName, participation } = useRoomInfoStore();

	return (
		<RoomNameWrapper>
			<NameWrapper>{roomName}</NameWrapper>
			<ParticipantNum>{participation}</ParticipantNum>
		</RoomNameWrapper>
	);
};

export default RoomName;

const RoomNameWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const NameWrapper = styled.div``;

const ParticipantNum = styled.div``;
