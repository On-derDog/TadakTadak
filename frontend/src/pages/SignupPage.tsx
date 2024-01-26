import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputForm } from "../components/InputForm";
import { Button } from "../components/Button";
import { useStore, create } from "zustand";
import { UserInfoStore } from "../stores/UserInfoStore";
import { devtools } from 'zustand/middleware'
import axios from 'axios';



const SignupPage = () => {
    const navigate = useNavigate();
    const userInfo = useStore(UserInfoStore);
    let passwordCheck:string;
    let message:string;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        if (name === 'email') {
          userInfo.updateEmail(value);
        } else if (name === 'password') {
          userInfo.updatePassword(value);
        }
        else if (name === 'password-check') {
            if(userInfo.password === value){
                console.log("일치하는 비밀번호 입니다.")
            }else{
                console.log("비밀번호가 일치하지 않습니다.")
            }
        }
        else if (name === 'username') {
            userInfo.updateUsername(value);
        }
    }

    // 통신코드
    const checkEmailDuplicate = async () => {
        try {
            const response = await axios.post('http://localhost:8001/user-service/login', {
                username: userInfo.username,
                email: userInfo.email,
                password: userInfo.password
              });
      
          const data = response.data;
      
        } catch (error) {
          console.error("API 통신 에러:", error);
        }
      };

    const onButtonClick = (action:string) => {
        switch(action){
          case "onSetEmailCheck":
            console.log(`API 통신 ${userInfo.email}`)
            break;
            case "onSetNicknameCheck":
                console.log(`API 통신 ${userInfo.username}`)
                break;
            case "onSignup":
                console.log(`회원가입 ${userInfo.email}, ${userInfo.password}, ${userInfo.username}`);
                checkEmailDuplicate();
                setTimeout(()=> navigate("/"),2000);
                break;
            default:
                console.error("error")
        }
    }


    return(
        <main className="SignupPage-wrapper">
          <section className="SigupPage-container">
            <>It's SignupPage!</>
            <br/>    
  
            {/* email input */}
            <InputForm onChange={onChange}type = 'text' title="이메일"  name="email" value={userInfo?.email} placeholder="이메일을 입력해주세요"/>
            <Button onClick={ () => onButtonClick("onSetEmailCheck")} label={"중복확인"}></Button>
            {/* <span> {message} </span> */}
            <br/>            
  
            {/* pw input */}
            <InputForm onChange={onChange}
            type = 'password' title="비밀번호"  name="password" value={userInfo?.password} placeholder="비밀번호을 입력해주세요"/>
            <br/>     
            {/* password duplicate check */}
            <InputForm onChange={onChange}
            type = 'password' title="비밀번호 확인"  name="password-check" value={passwordCheck} placeholder="비밀번호을 다시 입력해주세요"/>
            
            <br/>    

            {/* username input */}
            <InputForm onChange={onChange}
            type = 'text' title="닉네임"  name="username" value={userInfo?.username} placeholder="닉네임을 입력해주세요"/>
            <Button onClick={ () => onButtonClick("onSetNicknameCheck")} label={"중복 확인"}></Button>
            <br/>
            <br/>
            <Button onClick={ () => onButtonClick("onSignup")} label={"회원가입"}></Button>
            <br/>
          </section>  
        </main>
    )
};

export default SignupPage;
