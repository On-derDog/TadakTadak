import styled from '@emotion/styled';
import Member from './Member';
import { useRoomInfoStore } from '../../stores/useRoomInfoStore';

const RoomMember: React.FC = () => {
	const { owner, chatMemberResponses } = useRoomInfoStore();

	return (
		<RoomMemberWrapper>
			<OwnerWrapper>방장 : {owner}</OwnerWrapper>
			<TitleWrapper>팀원</TitleWrapper>
			<MemberList>
				{chatMemberResponses.map((member, index) => (
					<Member key={index} username={member.username} />
				))}
			</MemberList>
		</RoomMemberWrapper>
	);
};

export default RoomMember;

const RoomMemberWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 0.5rem 0.625rem 0.5rem 0.625rem;
`;

const OwnerWrapper = styled.div`
	font-size: var(--font-size-mg);
	margin-bottom: 1rem;
`;

const TitleWrapper = styled.div`
	font-size: var(--font-size-mg);
	margin-bottom: 0.5rem;
`;

const MemberList = styled.div`
	display: flex;
	flex-direction: column;
`;
