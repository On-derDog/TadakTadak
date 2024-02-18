import styled from '@emotion/styled';
import { useRoomInfoStore } from '../../stores/useRoomInfoStore';
import { listDataProps } from '../../interface/UserListInterface';

const RoomName = ({ roomName }: listDataProps) => {
	const { participation } = useRoomInfoStore();

	return (
		<RoomNameWrapper>
			<NameWrapper>{roomName}</NameWrapper>
			<ParticipantNum>참여자수 : {participation}</ParticipantNum>
		</RoomNameWrapper>
	);
};

export default RoomName;

const RoomNameWrapper = styled.div`
	width: calc(100% - 1.25rem);
	height: 2.5rem;
	padding: 0.5rem 0.625rem 0.5rem 0.625rem;
	display: flex;
	flex-direction: column;
	justify-content: left;
	align-items: left;
`;

const NameWrapper = styled.div`
	margin-bottom: 0.2rem;
	font-size: var(--font-size-lg);
`;

const ParticipantNum = styled.div`
	font-size: var(--font-size-mg);
`;
