import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputForm } from "../components/auth/InputForm";
import { Button } from "../components/common/Button";
import { NaverLoginButton } from "../components/auth/NaverLoginButton";
import { useStore } from "zustand";
import { UserInfoStore } from "../stores/UserInfoStore";
import { AuthApis }  from "../hooks/react-query/useAuthQuery";
import styled from "@emotion/styled"
import LogoSVG from "../assets/Logo.svg"
import TadakTadakSVG from "../assets/TadakTadak.svg"
import Toast from "../components/common/Toast";

const SigninPage = () => {
    const navigate = useNavigate();
    const userInfo = useStore(UserInfoStore);
    const [toast, setToast] = useState(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        if (name === 'email') {
          userInfo.updateEmail(value); 
        } else if (name === 'password') {
          userInfo.updatePassword(value);
        }
    };

    async function onButtonClick (action:string) {
      switch(action){
        case "onSignin":
          const response = await AuthApis.signin(userInfo);
          console.log("button 클릭", response)
          if ( response.headers.accesstoken) {
              navigate("/");
          }
          else{
              setToast((prev) => {
                console.log("prev:", prev);
                // 토스트 알림 초기화
                setTimeout(() => {
                  setToast(false);
                }, 10000);

              return true;
          })}
        break;
      case "onSignup":
            navigate("/signup")
            break;
        default:
            console.error("error")
      }
    }

    return(
      <SignInWrapper>
        <SignInContainer>
          <LogoContainer>
            <figure className="Logo"> 
              <img src={LogoSVG} alt="logo"/>
              <figcaption>
                <img src={TadakTadakSVG} alt="TadakTadak"/>
              </figcaption>
            </figure>
          </LogoContainer>
          <br/>    

          {/* email input */}
          <InputForm onChange={onChange}type = 'text' title="이메일" imgSVG="Email"  name="email" value={userInfo?.email} placeholder="이메일을 입력해주세요"/>

          <br/>            
          {/* pw input */}
          <InputForm onChange={onChange}
          type = 'password' imgSVG="Password" title="비밀번호"  name="password" value={userInfo?.password} placeholder="비밀번호을 입력해주세요"/>

          <br/>
          <Button onClick={ () => onButtonClick("onSignin")} backgroundColor={"primary"} label={"로그인"}></Button>
          <br/>
          <Button onClick={ () => onButtonClick("onSignup")} backgroundColor={"secondary"}  label={"회원가입"}></Button>
          <br/>
          <NaverLoginButton/>


          {toast && <Toast messageType="loginError" type="error" />}
        </SignInContainer>  
      </SignInWrapper>
  )
  
};

export default SigninPage;

const SignInWrapper = styled.main`
  display: flex;
  padding: 2rem;
  align-items: center;
  justify-content: center;
`

const SignInContainer = styled.section`
  display: flex;
  flex-direction: column;
`

const LogoContainer = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 191px;
  }
`