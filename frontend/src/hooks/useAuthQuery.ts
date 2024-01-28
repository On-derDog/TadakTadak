import axios from 'axios';
import { UserInfo, UserInfoStore } from '../stores/UserInfoStore';
import { useStore } from 'zustand';
import { useQuery, UseQueryResult } from '@tanstack/react-query';


export const AuthApis = {
  instance: axios.create({
    baseURL: "http://localhost:8001/user-service/",
    withCredentials: true,
  }),

  checkEmailDuplicate: async (userInfo: UserInfo): Promise<Boolean> => {
    const response = await AuthApis.instance.post(`/signup/exists/${userInfo.email}`, {
      email: userInfo.email,
    });
    return response.data === true;
  },

  useCheckEmailDuplicateQuery: (userInfo: UserInfo) => {
    const { data, isLoading, error } = useQuery<Boolean, Error>({
      queryKey: ['checkEmailDuplicateQuery', userInfo.email],
      queryFn: () => AuthApis.checkEmailDuplicate(userInfo),
    });
    return { data, isLoading, error };
  },
  
  checkUsernameDuplicate: async (userInfo:UserInfo): Promise<Boolean> => {
    const response = await AuthApis.instance.post(`/signup/exists/${userInfo.username}`, {
      username: userInfo.username,
    });
    return response.data === true;
  },

  checkUsernameDuplicateQuery: (userInfo: UserInfo) => {
    const { data, isLoading, error } = useQuery<Boolean, Error>({
      queryKey: ['checkUsernameDuplicateQuery', userInfo.username],
      queryFn: () => AuthApis.checkUsernameDuplicate(userInfo),
    });
    return { data, isLoading, error };
  },

  signup: async (userInfo:UserInfo, passwordConfirm: string) => {
    try {
      const response = await AuthApis.instance.post('/login', {
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
        passwordConfirm: passwordConfirm,
      });
      const data = response.data;
      const jwtToken = data.token;
      localStorage.setItem('jwtToken', jwtToken);
      return data;
    } catch (error) {
      console.error("API 통신 에러:", error);
    }
  },

  signupQuery: (userInfo: UserInfo,passwordConfirm:string) => {
    const { data, isLoading, error } = useQuery<Boolean, Error>({
     queryKey: ['signupQuery', userInfo,passwordConfirm],
      queryFn: () => AuthApis.signup(userInfo,  passwordConfirm),
    });
    return { data, isLoading, error };
  },

  fetchData: async (endpoint: string, type: string, data?: any) => {
    let response;
  
    switch (type) {
      case 'get':
        response = await axios.get(`http://localhost:8001/user-service/${endpoint}`);
        break;
      case 'post':
        response = await axios.post(`http://localhost:8001/user-service/${endpoint}`, data);
        break;
      default:
        console.error("Invalid type:", type);
    }
    return response;
  }
  
};


