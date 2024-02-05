import styled from '@emotion/styled';
import { useEffect, useRef } from 'react'

const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID;
const CLIENT_ID_2 = import.meta.env.VITE_APP_CLIENT_ID_2;


export const NaverLoginButton = () => {
  const naverRef = useRef()
	const { naver } = window
  const REDIRECT_URI = "http://localhost:5173/signupnaver";

  const STATE = "flase";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&state=${STATE}`;

  const NaverLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  }

	const initializeNaverLogin = () => {
		const naverLogin = new naver.LoginWithNaverId({
			clientId: CLIENT_ID_2,
			callbackUrl: REDIRECT_URI,        
			isPopup: false,
			loginButton: { color: 'green', type: 3, height: 58 },
			callbackHandle: true,
		})
		naverLogin.init()
    
    naverLogin.getLoginStatus(async function (status) {
			if (status) {
        const userid = naverLogin.user.getEmail()
				const username = naverLogin.user.getName()
        console.log(userid,username)
			}
		})     
	}

	useEffect(() => {
		initializeNaverLogin()
	}, [])

  const handleNaverLogin = () => {
		naverRef.current.children[0].click()
	}


  return (
    <>
      <NaverIdLogin ref={naverRef} id="naverIdLogin" />
      {/* <NaverButtonStyles>
        <div className="NaverLoginButton-wrapper" onClick={handleNaverLogin}>
          <div className="btn-naver">
            <div className="Logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="0.5" y="0.0727539" width="5" height="15" fill="white"/>
                <rect x="10.5" y="0.0727539" width="5" height="15" fill="white"/>
                <rect x="2.51801" y="1.81" width="3.62" height="15.4" transform="rotate(-30 2.51801 1.81)" fill="white"/>
              </svg>
            </div>
            <span className="text">FE 프록시 적용 간편 가입</span>
          </div>
        </div>
      </NaverButtonStyles> */}

      {/* BE TEST */}
      <NaverButtonStyles>
        <div className="NaverLoginButton-wrapper" onClick={NaverLogin}>
          <div className="btn-naver">
            <div className="Logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="0.5" y="0.0727539" width="5" height="15" fill="white"/>
                <rect x="10.5" y="0.0727539" width="5" height="15" fill="white"/>
                <rect x="2.51801" y="1.81" width="3.62" height="15.4" transform="rotate(-30 2.51801 1.81)" fill="white"/>
              </svg>
            </div>
            <span className="text">BE에게 전달 가입</span>
          </div>
        </div>
      </NaverButtonStyles>
    </>
  );
}

const NaverIdLogin = styled.div`
	display: none`;

const NaverButtonStyles = styled.div`
  .NaverLoginButton-wrapper {
    display: flex;
  }

  .Logo{
    display: flex;
  }

  .btn-naver {
    width: 300px;
    height: 46px;
    background: #03C75A;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    transition: background-color 0.3s; 
  }

  .text {
    font-family: 'Noto Sans', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    text-align: center;
    color: #ffffff;
  }

  .btn-naver:hover {
    background-color: #029445;
  }
`;