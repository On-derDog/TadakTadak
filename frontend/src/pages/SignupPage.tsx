import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputForm } from "../components/InputForm";
import { Button } from "../components/Button";
import { useStore } from "zustand";
import { UserInfoStore } from "../stores/UserInfoStore";
import styled from '@emotion/styled';
import axios from 'axios';

import { AuthApis }  from "../hooks/useAuthQuery";

type isValid = {
    passwordIsValid: boolean;
    passwordCheckIsValid: boolean;
    emailIsValid: boolean;
    usernameIsValid: boolean;
    messageValidPw1Color: 'black' | 'blue';
    messageValidPw2Color: 'black' | 'blue';
};

const SignupPage = () => {
    const navigate = useNavigate();
    const userInfo = useStore(UserInfoStore);
    const [messageValidPw1, setMessageValidPw1] = useState<string>('숫자/영어/특수문자를 혼용하여 3종류를 사용하세요.');
    const [messageValidPw2, setMessageValidPw2] = useState<string>('비밀번호는 1자 이상 20자 이하로 입력하세요.');

    const [messagePw, setMessagePw] = useState<string>("");
    const [messageEmail, setMessageEmail] = useState<string>("");
    const [messageUsername, setMessageUsername] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    
    const [isValid, setIsValid] = useState<isValid>({
        passwordIsValid: false,
        passwordCheckIsValid: false,
        emailIsValid: false,
        usernameIsValid: false,
        messageValidPw1Color: 'black',
        messageValidPw2Color: 'black',
    });

    // const authApis = AuthApis(userInfo);

    useEffect(()=>{
        console.log(isValid)
    },[isValid])

    //inputForm 코드
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        if (name === 'email') {
            setIsValid((prev) => ({ ...prev, emailIsValid: false }));
            userInfo.updateEmail(value);
        } else if (name === 'password') {
            userInfo.updatePassword(value);
            checkValidPassword(value);
            if(isValid.passwordIsValid)
                console.log("사용가능한 비밀번호입니다");
        }
        else if (name === 'password-check') {
            setPasswordConfirm(value);
            if(userInfo.password === value){
                isValid.passwordCheckIsValid= true;
                setMessagePw("일치하는 비밀번호 입니다.")}
            else{
                isValid.passwordCheckIsValid= false;
                setMessagePw("비밀번호가 일치하지 않습니다.")
            }
        }
        else if (name === 'username') {
            setIsValid((prev) => ({ ...prev, usernameIsValid: false }));
            userInfo.updateUsername(value);
        }
    }

    // 비밀번호 예외처리
    const checkValidPassword = (password: string) => {
        // 숫자/영어/특수문자를 혼용했는가
        const pattern = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/;
        
        // 1~20자내인가
        const isValidLength = password.length >= 1 && password.length <= 20;
        setIsValid(prevState => ({
            ...prevState,
            messageValidPw1Color: pattern.test(password) ? 'blue' : 'black',
            messageValidPw2Color: isValidLength ? 'blue' : 'black',
            passwordIsValid: pattern.test(password) && isValidLength,
        }));
    };

    // API 반환값 설정
    const handleCheckEmailDuplicate = async () => {
        const { data, isLoading } = await AuthApis.useCheckEmailDuplicateQuery(userInfo); // react-query: true/false date로 반환
        // const data = await AuthApis.checkEmailDuplicate(userInfo);
        if (data) {
            setIsValid((prev) => ({ ...prev, emailIsValid: true }));
        }
    };


    // API 반환값 설정
    const handlecheckUsernameDuplicate = async () => {
        const data = await AuthApis.checkUsernameDuplicate(userInfo)
        if (data) {
            setIsValid((prev) => ({ ...prev, usernameIsValid: true }));
        }
    };

    // 버튼코드
    const onButtonClick = (action:string) => {
        switch(action){
            case "onSetEmailCheck":
            console.log(`API 통신 ${userInfo.email}`)
            handleCheckEmailDuplicate();
            if(!isValid.emailIsValid)
                setMessageEmail('중복된 이메일입니다')
            else
                setMessageEmail('사용 가능한 이메일입니다')
                break;

            case "onSetNicknameCheck":
                console.log(`API 통신 ${userInfo.username}`)
                handlecheckUsernameDuplicate();
                if(!isValid.usernameIsValid)
                    setMessageUsername('중복된 닉네임입니다')
                else
                    setMessageUsername('사용 가능한 닉네임입니다')
                break;

            case "onSignup":
                console.log(`회원가입 ${userInfo.email}, ${userInfo.password},${passwordConfirm}, ${userInfo.username}`);

                if (isValid.passwordIsValid && isValid.passwordCheckIsValid && isValid.emailIsValid && isValid.usernameIsValid) {
                    console.log("로그인 성공");
                    AuthApis.signup(userInfo,passwordConfirm);
                    navigate("/");
                }
                else
                    console.log("조건이 안맞음");
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
                <span> {messageEmail} </span>
                <br/>            
  
                {/* pw input */}
                <InputForm onChange={onChange}
                type = 'password' title="비밀번호"  name="password" value={userInfo?.password} placeholder="비밀번호을 입력해주세요"/><br/>
                <MessageValidPw color={isValid.messageValidPw1Color}> {messageValidPw1} </MessageValidPw> <br/>
                <br/>
                <MessageValidPw color={isValid.messageValidPw2Color}> {messageValidPw2} </MessageValidPw> <br/>
                <br/>     
                {/* password duplicate check */}
                <InputForm onChange={onChange}
                type = 'password' title="비밀번호 확인"  name="password-check" value={passwordConfirm} placeholder="비밀번호을 다시 입력해주세요"/>
                <span> {messagePw} </span>
                <br/>    

                {/* username input */}
                <InputForm onChange={onChange}
                type = 'text' title="닉네임"  name="username" value={userInfo?.username} placeholder="닉네임을 입력해주세요"/>
                <Button onClick={ () => onButtonClick("onSetNicknameCheck")} label={"중복 확인"}></Button>
                <span> {messageUsername} </span>
                <br/>
                <br/>
                <Button onClick={ () => onButtonClick("onSignup")} label={"회원가입"}></Button>
                <br/>
            </section>  
        </main>
    )
};

export default SignupPage;


// 스타일 적용
const MessageValidPw = styled.p<{ color: string }>`
  color: ${(props) => props.color};
`;