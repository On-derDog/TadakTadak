import React,{useState} from "react";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
    const [inputs,setInputs] = useState({
        email: '',
        password : '',
    });

    const {email,password} = inputs
    const navigate = useNavigate();

    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
        console.log(inputs);
    }

    const onSignin = (e) =>{
        console.log("값확정",inputs)
        setTimeout(() => navigate("/"), 2000);
    }

    const onSignUp = (e) =>{
        console.log("회원가입",inputs)
        setTimeout(() => navigate("/signup"), 2000);
    }

    const onSignKaKaoUp = (e) =>{
        console.log("카카오 회원가입",inputs)
        setTimeout(() => navigate("/signupkakao"), 2000);
    }

    return(
        <main className="SigninPage-wrapper">
          <section className="SiginPage-container">
              <h1> TadakTadak Logo </h1>
              <>It's SigninPage!</>
            
            </section>  

            {/* email input */}
            <span>이메일</span>
            <input onChange={onChange} type = 'text'  name="email" value={email} placeholder="이메일을 입력해주세요"></input>

            <br/>

            {/* pw input */}
             <span>비밀번호</span>
            <input onChange={onChange} 
            type = 'password' name="password" value={password} placeholder="비밀번호을 입력해주세요"></input>

            <br/>
            <button onClick={onSignin}>로그인</button>
            <br/>
            <button onClick={onSignUp}>회원가입</button>
            <br/>
            <button onClick={onSignKaKaoUp}>카카오톡으로 로그인</button>

        </main>
    )
};

export default SigninPage;
