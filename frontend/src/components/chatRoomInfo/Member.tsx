import styled from '@emotion/styled';
import KickBtn from './KickBtn';
import ChangeBtn from './ChangeBtn';

interface MemberProps {
	username: string;
	isOwner: boolean;
	roomId: string;
}

const Member: React.FC<MemberProps> = ({ username, isOwner, roomId }) => {
	const handleKick = () => {
		if (isOwner) {
			const apiUrl = `/chatroom-service/rooms/${roomId}/kicked/${username}`;
			fetch(apiUrl, {
				method: 'POST',
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error('Failed to kick member');
					}
				})
				.catch((error) => {
					console.error('Error kicking member:', error);
				});
		} else {
			console.log('You are not the owner. Cannot kick member.');
		}
	};

	return (
		<MemberWrapper>
			<KickWrapper>{isOwner && <KickBtn onClick={handleKick} />}</KickWrapper>
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
