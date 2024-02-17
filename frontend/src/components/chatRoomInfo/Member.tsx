import styled from '@emotion/styled';
import KickBtn from './KickBtn';
import ChangeBtn from './ChangeBtn';
import { useRoomInfoStore } from '../../stores/useRoomInfoStore';
import { useParams } from 'react-router-dom';
import { UserInfoStore } from '../../stores/UserInfoStore';
interface MemberProps {
	username: string;
}

const Member: React.FC<MemberProps> = ({ username }) => {
	const { owner, setOwner, setChatMemberResponses } = useRoomInfoStore();
	const { chatroom_id } = useParams();

	const userInfo = UserInfoStore();
	const userId = userInfo.username;
	// 멤버 강퇴 함수
	const handleKick = () => {
		if (userId === owner) {
			const apiUrl = `http://localhost:8002/chatroom-service/rooms/${chatroom_id}/kicked/${username}`;
			fetch(apiUrl, {
				method: 'POST',
				body: JSON.stringify(userId),
				headers: {
					'Content-Type': 'application/json',
				},
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
		if (userId === owner) {
			const apiUrl = `http://localhost:8002/chatroom-service/rooms/${chatroom_id}/change-owner/${username}`;
			fetch(apiUrl, {
				method: 'PATCH',
				body: JSON.stringify(userId),
				headers: {
					'Content-Type': 'application/json',
				},
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
		} else {
			console.log('You are not the owner. Cannot change owner.');
		}
	};

	return (
		<MemberWrapper>
			<KickWrapper>{owner === userId && <KickBtn onClick={handleKick} />}</KickWrapper>
			<MemberName>{username}</MemberName>
			<ChangeOwner>{owner === userId && <ChangeBtn onClick={handleChangeOwner} />}</ChangeOwner>
		</MemberWrapper>
	);
};

export default Member;

const MemberWrapper = styled.div`
	width: 100%;
	hight: 2rem;
	display: flex;
	flex-direction: row;
	padding: 0.3em 0rem 0.3rem 0rem;
`;
const KickWrapper = styled.div`
	margin-right: auto;
`;
const MemberName = styled.div`
	margin-left: 0.2rem;
	text-align: left;
`;
const ChangeOwner = styled.div`
	margin-left: auto;
`;
