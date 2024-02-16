import styled from '@emotion/styled';
import Member from './Member';

interface RoomMemberProps {
	owner: string;
	isOwner: boolean;
	chatMemberResponses: { username: string }[];
}

const RoomMember: React.FC<RoomMemberProps> = ({ owner, isOwner, chatMemberResponses }) => {
	return (
		<RoomMemberWrapper>
			<OwnerWrapper>방장 : {owner}</OwnerWrapper>
			<TitleWrapper>팀원</TitleWrapper>
			<MemberList>
				{chatMemberResponses.map((member, index) => (
					<Member key={index} username={member.username} isOwner={isOwner} roomId={'1'} />
				))}
			</MemberList>
		</RoomMemberWrapper>
	);
};

export default RoomMember;

const RoomMemberWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const OwnerWrapper = styled.div``;

const TitleWrapper = styled.div``;

const MemberList = styled.div`
	display: flex;
	flex-direction: column;
`;
