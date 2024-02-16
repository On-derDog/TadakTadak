import styled from '@emotion/styled';
import { UserList } from '../../interface/UserListInterface';

import { ColumnDisplay } from '../../styles/ComponentLayout';

interface UserListProps {
	userlist: UserList[];
}

const UserProfile = ({ userlist }: UserListProps) => {
	return (
		<>
			{userlist.map((item, index) => (
				<ProfileContainer key={index}>
					<Text>{item.username}</Text>
					<SmallText>{item.roomName}</SmallText>
				</ProfileContainer>
			))}
		</>
	);
};

export default UserProfile;

const ProfileContainer = styled.div`
	${ColumnDisplay}
	width: calc(100% - 1.25rem);
	height: 1.875rem;
	padding: 0.625rem;
	border-bottom: 1px solid var(--color-mercury);
`;

const Text = styled.span`
	font-size: var(--font-size-xs);
`;

const SmallText = styled.span`
	width: 100%;
	margin-top: 0.5rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-size: var(--font-size-xxs);
	color: var(--color-orient);
`;

// const DUMMY_DATA: UserList[] = [
// 	{
// 		userName: 'k546kh@naver.com',
// 	},
// 	{
// 		userName: 'k546kh@gmail.com',
// 	},
// 	{
// 		userName: 'k546h@knu.ac.kr',
// 	},
// 	{
// 		userName: 'k546kh@nate.com',
// 	},
// 	{
// 		userName: 'k546kh@daum.net',
// 	},
// ];
