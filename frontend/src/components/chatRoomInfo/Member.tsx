import styled from '@emotion/styled';
import KickBtn from './KickBtn';
import ChangeBtn from './ChangeBtn';

interface MemberProps {
	username: string;
}

const Member: React.FC<MemberProps> = ({ username }) => {
	return (
		<MemberWrapper>
			<KickWrapper>
				<KickBtn />
			</KickWrapper>
			<MemberName>{username}</MemberName>
			<ChangeOwner>
				<ChangeBtn />
			</ChangeOwner>
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
