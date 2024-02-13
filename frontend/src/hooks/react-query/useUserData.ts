import axios from 'axios';
import { UserData } from '../../interface/UserListInterface';

export const getUserData = async (): Promise<UserData> => {
	try {
		const accessToken = localStorage.getItem('AccessToken');
		if (!accessToken) {
			throw new Error('AccessToken이 없습니다.');
		}

		const response = await axios.get('http://localhost:8001/user-service/user-info', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
		});

		return response.data as UserData;
	} catch (error) {
		console.error('Error fetching user data:', error);
		throw error;
	}
};
