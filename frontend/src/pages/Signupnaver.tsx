import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { useStore } from 'zustand';

import { UserInfoStore } from '../stores/UserInfoStore';

const Signupnaver = () => {
  const navigate = useNavigate();
  const userInfo = useStore(UserInfoStore);
  const [code, setCode] = useState<string | null>(null);

  const userAccessToken = () => {
    // window.location.href.includes('access_token') && getToken();
    getToken();
    navigate('/');
  };

  const getToken = async () => {
    const token = window.location.href.split('=')[1].split('&')[0];
    localStorage.setItem('Accesstoken', token);

    //   // FE 코드 CORS로 proxy적용
    //   try{
    //   const userInfoResponse = await axios.get('/api/v1/nid/me', {
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   });
    //   console.log(userInfoResponse.data.response.email);
    //   userInfo.updateEmail(userInfoResponse.data.response.email);
    //   userInfo.updateUsername(userInfoResponse.data.response.nickname);
    // } catch(error) {
    //   console.error("FE proxy 오류",error);
    // }

    // BE에게 전달
    try {
      const response = await axios.post('/oauth2/token', {
        code: code,
      });
      console.log(response.data);

      navigate('/');
    } catch (error) {
      console.error('BE 전달오류', error);
    }
  };

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code');
    setCode(code);
    console.log('BE 전달:', code);
    userAccessToken();
  }, []);

  return <div></div>;
};

export default Signupnaver;
