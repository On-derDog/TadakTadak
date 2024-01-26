import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InputForm } from "../components/InputForm";
import { Button } from "../components/Button";
import { useStore, create } from "zustand";
import { UserInfoStore } from "../stores/UserInfoStore";
import { devtools } from 'zustand/middleware'

const SignupPage = () => {
    const navigate = useNavigate();
    const userInfo = useStore(UserInfoStore);
    let passwordCheck:string;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        if (name === 'email') {
          userInfo.updateEmail(value); 
        } else if (name === 'password') {
          userInfo.updatePassword(value);
        }
        else if (name === 'password-check') {
            if(userInfo.password === value){
                console.log("비밀번호가 동일합니다.")
            }
        }
        else if (name === 'username') {
            userInfo.updateUsername(value);
        }
    }

    const onButtonClick = (action:string) => {
        switch(action){
          case "onSignupEmail":
            console.log(`API 통신 ${userInfo.email}`)
            break;
          case "onSetNickname":
            console.log(`API 통신 ${userInfo.username}`)
            break;
          case "onSignup":
            console.log(`회원가입 ${userInfo.email}, ${userInfo.password}, ${userInfo.username}`);
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
            <Button onClick={ () => onButtonClick("onSignupEmail")} label={"중복확인"}></Button>
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
            <Button onClick={ () => onButtonClick("onSetNickname")} label={"중복 확인"}></Button>
            <br/>
            <br/>
            <Button onClick={ () => onButtonClick("onSignup")} label={"회원가입"}></Button>
            <br/>
          </section>  
        </main>
    )
};

export default SignupPage;
