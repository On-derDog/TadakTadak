import styled from '@emotion/styled';

interface RoomNameProps {
	roomName: string;
	participation: number;
}

const RoomName: React.FC<RoomNameProps> = ({ roomName, participation }) => {
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
