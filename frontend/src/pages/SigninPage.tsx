import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputForm } from "../components/InputForm";
import { Button } from "../components/Button";
import { NaverLoginButton } from "../components/auth/NaverLoginButton";
import { useStore } from "zustand";
import { UserInfoStore } from "../stores/UserInfoStore";
import { AuthApis }  from "../hooks/useAuthQuery";
import styled from "@emotion/styled"
import LogoSVG from "../assets/Logo.svg"
import TadakTadakSVG from "../assets/TadakTadak.svg"
import axios from "axios";

const SigninPage = () => {
    const navigate = useNavigate();
    const userInfo = useStore(UserInfoStore);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        if (name === 'email') {
          userInfo.updateEmail(value); 
        } else if (name === 'password') {
          userInfo.updatePassword(value);
        }
  };

    const onButtonClick = (action:string) => {
      switch(action){
        case "onSignin":
            AuthApis.signin(userInfo);
            navigate("/");
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
          <Button onClick={ () => onButtonClick("onSignin")} label={"로그인"}></Button>
          <br/>
          <Button onClick={ () => onButtonClick("onSignup")} label={"회원가입"}></Button>
          <br/>
          <NaverLoginButton/>
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