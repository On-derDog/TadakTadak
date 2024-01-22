import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { InputForm } from "../components/InputForm";
import { Button } from "../components/Button";

const SigninPage = () => {
    const navigate = useNavigate();
    const [inputs,setInputs] = useState({
        email: '',
        password : '',
    });
    const {email,password} = inputs


    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
        console.log(inputs);
    }

    const onButtonClick = (action) => {
        console.log(action ,inputs);
        switch(action){
            case "onSignIn":
                setTimeout(()=> navigate("/"),2000);
                break;
            case "onSignUp":
                setTimeout(()=> navigate("/signup"),2000);
                break;
            case "onSignUpKakao":
                setTimeout(()=> navigate("/signupkakao"),2000);
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
            
            </section>  

            {/* email input */}
            <InputForm onChange={onChange} type = 'text' title="이메일"  name="email" value={email} placeholder="이메일을 입력해주세요"/>

            <br/>

            {/* pw input */}
            <InputForm onChange={onChange} 
            type = 'password' title="비밀번호"  name="password" value={password} placeholder="비밀번호을 입력해주세요"/>

            <br/>
            <Button onClick={ () => onButtonClick("onSignIn")} label={"로그인"}></Button>
            <br/>
            <Button onClick={ () => onButtonClick("onSignUp")} label={"회원가입"}></Button>
            <br/>
            <Button onClick={ () => onButtonClick("onSignUpKakao")} label={"카카오 로그인"}></Button>


        </main>
    )
};

export default SigninPage;
