import styled from '@emotion/styled';

const REST_API_KEY = import.meta.env.VITE_APP_REST_API_KEY;

export const NaverLoginButton = () => {

  const REDIRECT_URI = "http://127.0.0.1:5173/SignUpKakaoPage";
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;


  return(
    <NaverButtonStyles>
      <div className="NaverLoginButton-wrapper">
        <a href={KAKAO_AUTH_URI} className="btn-naver">
          <div className="Logo">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="0.5" y="0.0727539" width="5" height="15" fill="white"/>
            <rect x="10.5" y="0.0727539" width="5" height="15" fill="white"/>
            <rect x="2.51801" y="1.81" width="3.62" height="15.4" transform="rotate(-30 2.51801 1.81)" fill="white"/>
            </svg>
          </div>
          <span className="text">네이버로 간편 가입</span>
        </a>
      </div>
    </NaverButtonStyles>
  )
}

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
    background-color: #fff7ac;
  }
`;