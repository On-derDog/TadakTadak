import { roomNameInfo } from '../../interface/RoomInterface';
import axios from 'axios';

export const getRoomName = async (
  chatroomId: string
): Promise<roomNameInfo> => {
  try {
    const accessToken = localStorage.getItem('Accesstoken');
    // console.log(accessToken);
    if (!accessToken) {
      throw new Error('AccessToken이 없습니다.');
    }

    const response = await axios.get(
      `http://localhost:8002/chatroom-service/rooms/${chatroomId}/roomName`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accesstoken: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data as roomNameInfo;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
