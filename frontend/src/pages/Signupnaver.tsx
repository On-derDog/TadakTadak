import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Signupnaver = () => {
  const [code,setCode] = useState('');
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

	const userAccessToken = () => {
		window.location.href.includes('access_token') && getToken()
    navigate('/')
	}
        
  const getToken = async () => {
		const token = window.location.href.split('=')[1].split('&')[0]
    localStorage.setItem('Accesstoken', token)
    console.log(token)
    // 네이버 API를 호출하여 사용자 정보 가져오기 proxy 적용중 수정필요
    try {
      const response = await axios.get('/api/v1/nid/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }}
          )
      .then(response => {
        console.log(response.data)
      })
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
