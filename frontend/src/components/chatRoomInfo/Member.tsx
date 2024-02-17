import styled from '@emotion/styled';
import KickBtn from './KickBtn';
import ChangeBtn from './ChangeBtn';
import { useRoomInfoStore } from '../../stores/useRoomInfoStore';
import { useParams } from 'react-router-dom';

interface MemberProps {
	username: string;
}

const Member: React.FC<MemberProps> = ({ username }) => {
	const { isOwner, setOwner, setChatMemberResponses } = useRoomInfoStore();
	const { chatroom_id } = useParams();

	// 멤버 강퇴 함수
	const handleKick = () => {
		if (isOwner) {
			const apiUrl = `/chatroom-service/rooms/${chatroom_id}/kicked/${username}`;
			fetch(apiUrl, {
				method: 'POST',
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error('Failed to kick member');
					}
					// 강퇴 후 리렌더링
					setChatMemberResponses([]);
				})
				.catch((error) => {
					console.error('Error kicking member:', error);
				});
		} else {
			console.log('You are not the owner. Cannot kick member.');
		}
	};

	// 방장 변경 함수
	const handleChangeOwner = () => {
		const apiUrl = `/chatroom-service/rooms/${chatroom_id}/change-owner/${username}`;
		fetch(apiUrl, {
			method: 'PATCH',
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Failed to change owner');
				}
				// 강퇴 후 리렌더링
				setOwner(username);
			})
			.catch((error) => {
				console.error('Error changing owner:', error);
			});
	};

	return (
		<MemberWrapper>
			<KickWrapper>{isOwner && <KickBtn onClick={handleKick} />}</KickWrapper>
			<MemberName>{username}</MemberName>
			<ChangeOwner>{isOwner && <ChangeBtn onClick={handleChangeOwner} />}</ChangeOwner>
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
