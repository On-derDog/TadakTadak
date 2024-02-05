import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserInfoStore } from '../stores/UserInfoStore';
import { useStore } from 'zustand';

const Signupnaver = () => {
  const navigate = useNavigate();
  const userInfo = useStore(UserInfoStore);

	const userAccessToken = () => {
		window.location.href.includes('access_token') && getToken()
    navigate('/')
	}
        
  const getToken = async () => {
		const token = window.location.href.split('=')[1].split('&')[0]
    localStorage.setItem('Accesstoken', token)

    // 네이버 API를 호출하여 사용자 정보 가져오기 proxy 적용중 수정필요
    try {
      const response = await axios.get('/api/v1/nid/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }}
          )
        console.log(response.data.response.email);
        userInfo.updateEmail(response.data.response.email)
        userInfo.updateUsername(response.data.response.nickname)
    } catch (error) {
      console.error('Error fetching user info', error);
    }
	}

  useEffect(() => {
		userAccessToken()
	}, [])

  return <div></div>;
};

export default Signupnaver;
