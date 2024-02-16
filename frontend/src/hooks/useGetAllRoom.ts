import axios from 'axios';
import { RoomsInfo } from '../stores/useRoomStore';
import { useStore } from 'zustand';

export const GetAllRoomsApis = {
  instance: axios.create({
    baseURL: 'http://localhost:8002/chat-service/',
    withCredentials: true,
  }),

  getAllRooms: async () => {
    const roomsInfo = RoomsInfo.getState();

    try {
      const res = await axios.get('http://localhost:8002/chatroom-service/rooms');
      roomsInfo.setRooms(res.data);
      return res.data;
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw error;
    }
  },
};
