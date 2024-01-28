import axios from 'axios';
import { UserInfoStore } from '../stores/UserInfoStore';
import { useStore } from 'zustand';

export const AuthApis = () => {
  const userInfo = useStore(UserInfoStore);

  // 통신코드
  const signup = async (passwordConfirm: string) => {
    try {
      const response = await axios.post('http://localhost:8001/user-service/login', {
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
        passwordConfirm: passwordConfirm,
      });
      const data = response.data;
      const jwtToken = data.token;
      localStorage.setItem('jwtToken', jwtToken);
    } catch (error) {
      console.error("API 통신 에러:", error);
    }
  };

  // 통신코드
  const checkEmailDuplicate = async () => {
    try {
      const response = await axios.post(`http://localhost:8001/user-service/signup/exists/${userInfo.email}`, {
        email: userInfo.email,
      });
      const data = response.data;
      return data === true;
    } catch (error) {
      console.error("API 통신 에러:", error);
      return false;
    }
  };

  // 통신코드
  const checkUsernameDuplicate = async () => {
    try {
      const response = await axios.post(`http://localhost:8001/user-service/signup/exists/${userInfo.username}`, {
        username: userInfo.username,
      });
      const data = response.data;
      return data === true;
    } catch (error) {
      console.error("API 통신 에러:", error);
      return false;
    }
  };

  return { signup, checkEmailDuplicate, checkUsernameDuplicate };
};
