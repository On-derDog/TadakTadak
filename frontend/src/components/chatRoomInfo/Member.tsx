import styled from '@emotion/styled';

interface MemberProps {
	username: string;
}

const Member: React.FC<MemberProps> = ({ username }) => {
	return (
		<MemberWrapper>
			<KickWrapper> - </KickWrapper>
			<MemberName>{username}</MemberName>
			<ChangeOwner> + </ChangeOwner>
		</MemberWrapper>
	);
};

export default Member;

const MemberWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;
const KickWrapper = styled.div``;
const MemberName = styled.div``;
const ChangeOwner = styled.div``;
