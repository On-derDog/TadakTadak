import axios,{ AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserInfo } from '../stores/UserInfoStore';


export const GetAllRoomsApis = {
  instance: axios.create({
    baseURL: "http://localhost:8002/chat-service/",
    withCredentials: true,
  }),

  getAllRooms: async () => {
    const res = await axios.get('http://localhost:8002/chatroom-service/rooms');
    return res.data;
  }
}