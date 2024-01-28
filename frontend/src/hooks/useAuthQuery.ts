import axios from 'axios';
import { UserInfoStore } from '../stores/UserInfoStore';
import { useStore } from 'zustand';
import { useQuery, useMutation } from '@tanstack/react-query';

export const AuthApis = {
  instance: axios.create({
    baseURL: "http://localhost:8001/user-service/",
    withCredentials: true,
  }),

  checkEmailDuplicate: async (userInfo) => {
    const response = await AuthApis.instance.post(`/signup/exists/${userInfo.email}`, {
      email: userInfo.email,
    });
    const data = response.data;
    return response.data === true;
  },

  checkUsernameDuplicate: async (userInfo) => {
    const response = await AuthApis.instance.post(`/signup/exists/${userInfo.username}`, {
      username: userInfo.username,
    });
    const data = response.data;
    return response.data === true;
  },

  signup: async (userInfo, passwordConfirm: string) => {
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
  }
,
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


  // 통신코드
  // const checkEmailDuplicate = async (userInfo) => {
  //   try {
  //     const response = await axios.post(`http://localhost:8001/user-service/signup/exists/${userInfo.email}`, {
  //       email: userInfo.email,
  //     });
  //     const data = response.data;
  //     return data === true;
  //   } catch (error) {
  //     console.error("API 통신 에러:", error);
  //     return false;
  //   }
  // };

  // // 통신코드
  // const checkUsernameDuplicate = async (userInfo) => {
  //   try {
  //     const response = await axios.post(`http://localhost:8001/user-service/signup/exists/${userInfo.username}`, {
  //       username: userInfo.username,
  //     });
  //     const data = response.data;
  //     return data === true;
  //   } catch (error) {
  //     console.error("API 통신 에러:", error);
  //     return false;
  //   }
  // };