import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputForm } from "../components/InputForm";
import { Button } from "../components/Button";
import { KakaoButton } from "../components/auth/KakaoButton";
import { useStore } from "zustand";
import { UserInfoStore } from "../stores/UserInfoStore";

import { AuthApis }  from "../hooks/useAuthQuery";
import axios from "axios";


const fetchDataExample = async () => {
    instance: axios.create({
        baseURL: "http://localhost:8001/user-service/",
        withCredentials: true,
      })

      try {
        AuthApis.setupInterceptors();
        const response = await AuthApis.instance.get('/hello',  {
            headers: { Accesstoken: `Bearer ${localStorage.getItem('Accesstoken')}` },
          });
        const data = response.data;
        console.log("로그인 성공")
        return data;
      } catch (error) {
      }
  };

const SigninPage:React.FC = () => {
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
        case "onSignupKakao":
            fetchDataExample();
            // navigate("/signupkakao")
            break;
        default:
            console.error("error")
      }
    }

    return(
      <main className="SigninPage-wrapper">
        <section className="SiginPage-container">
          <h1> TadakTadak Logo </h1>
          <>It's SigninPage!</>
          <br/>    

          {/* email input */}
          <InputForm onChange={onChange}type = 'text' title="이메일"  name="email" value={userInfo?.email} placeholder="이메일을 입력해주세요"/>

          <br/>            

          {/* pw input */}
          <InputForm onChange={onChange}
          type = 'password' title="비밀번호"  name="password" value={userInfo?.password} placeholder="비밀번호을 입력해주세요"/>

          <br/>
          <Button onClick={ () => onButtonClick("onSignin")} label={"로그인"}></Button>
          <br/>
          <Button onClick={ () => onButtonClick("onSignup")} label={"회원가입"}></Button>
          <br/>
          <Button onClick={ () => onButtonClick("onSignupKakao")} label={"테스트용코드"}></Button>
          <br/>
          <KakaoButton/>
        </section>  
      </main>
  )
  
};

export default SigninPage;