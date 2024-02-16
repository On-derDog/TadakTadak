import styled from '@emotion/styled';

interface MemberProps {
	username: string;
}

const Member: React.FC<MemberProps> = ({ username }) => {
	return (
		<MemberWrapper>
			<KickWrapper>Kick</KickWrapper>
			<MemberName>{username}</MemberName>
			<ChangeOwner>Change</ChangeOwner>
		</MemberWrapper>
	);
};

export default Member;

const MemberWrapper = styled.div``;
const KickWrapper = styled.div``;
const MemberName = styled.div``;
const ChangeOwner = styled.div``;
