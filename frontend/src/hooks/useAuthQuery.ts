import axios,{ AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserInfo } from '../stores/UserInfoStore';
import { useQuery } from '@tanstack/react-query';


export const AuthApis = {
  instance: axios.create({
    baseURL: "http://localhost:8001/user-service/",
    withCredentials: true,
  }),

  checkEmailDuplicate: async (userInfo: UserInfo): Promise<boolean> => {
    const response = await AuthApis.instance.get(`/signup/exists-email/${userInfo.email}`, {
      email: userInfo.email,
    });
    return response.data.valid === true;
  },

  useCheckEmailDuplicateQuery: (userInfo: UserInfo) => {
    const { data, isLoading, error } = useQuery<Boolean, Error>({
      queryKey: ['checkEmailDuplicateQuery', userInfo.email],
      queryFn: () => AuthApis.checkEmailDuplicate(userInfo),
    });
    return { data, isLoading, error };
  },
  
  checkUsernameDuplicate: async (userInfo:UserInfo): Promise<Boolean> => {
    const response = await AuthApis.instance.get(`/signup/exists-username/${userInfo.username}`, {
      username: userInfo.username,
    });
    return response.data.valid === true;
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
      const response = await AuthApis.instance.post('/signup', {
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password,
        passwordConfirm: passwordConfirm,
      });
      const data = response.data;

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


  signin: async (userInfo:UserInfo) => {
    try {
      const response = await AuthApis.instance.post('/login', {
        email: userInfo.email,
        password: userInfo.password,
      });
      const data = response.data;
      console.log(data);
      const accessToken = data.accessToken;
      const refreshToken = data.refreshToken;
  
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      return data;
    } catch (error) {
      console.error("API 통신 에러:", error);
    }
  },

  //refreshToken
  setupInterceptors: () => {
    AuthApis.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            console.log("토큰 갱신 :",);
            const refreshToken = localStorage.getItem('refreshToken');
            // 재발급받는 경로
            const response = await AuthApis.instance.post<{ accessToken: string }>('/hello', { refreshToken });

            const newAccessToken = response.data.accessToken;

            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            return AuthApis.instance(originalRequest);
          } catch (refreshError) {
            console.error("토큰 갱신 실패:", refreshError);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/signin';
          }
        }

        return Promise.reject(error);
      }
    );
  },


  // 리팩토링용 코드
  fetchData: async (endpoint: string, type: string, data?: any) => {
    let response;
  
    switch (type) {
      case 'get':
        response = await AuthApis.instance.get(`http://localhost:8001/user-service/${endpoint}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        });
        break;

      case 'post':
        response = await AuthApis.instance.post(`http://localhost:8001/user-service/${endpoint}`, data, {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        });
        break;

      default:
        console.error("Invalid type:", type);
    }
  
    return response;
  },
  
};

