import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from '@emotion/styled';
import { useStore } from 'zustand';

import { InputForm } from '../components/auth/InputForm';
import { Button } from '../components/common/Button';

import { AuthApis } from '../hooks/react-query/useAuthQuery';

import { UserInfoStore } from '../stores/UserInfoStore';

type isValid = {
  passwordIsValid: boolean;
  passwordCheckIsValid: boolean;
  emailIsValid: boolean;
  usernameIsValid: boolean;
  authCode: string;
  messageValidPw1Color: 'black' | 'blue';
  messageValidPw2Color: 'black' | 'blue';
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [messageValidPw1, setMessageValidPw1] = useState<string>(
    '숫자/영어/특수문자를 혼용하여 3종류를 사용하세요.'
  );
  const [messageValidPw2, setMessageValidPw2] = useState<string>(
    '비밀번호는 1자 이상 20자 이하로 입력하세요.'
  );
  const [messagePw, setMessagePw] = useState<string>('');
  const [messageEmail, setMessageEmail] = useState<string>('');
  const [messageUsername, setMessageUsername] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  const userInfo = useStore(UserInfoStore);
  const [isValid, setIsValid] = useState<isValid>({
    passwordIsValid: false,
    passwordCheckIsValid: false,
    emailIsValid: false,
    usernameIsValid: false,
    authCode: '',
    messageValidPw1Color: 'black',
    messageValidPw2Color: 'black',
  });

  // const authApis = AuthApis(userInfo);

  // 값 보존을 위한 코드 -> 값 변경되면 false 처리
  useEffect(() => {
    console.log(isValid);
  }, [isValid]);

  //inputForm 코드
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    if (name === 'email') {
      setIsValid((prev) => ({ ...prev, emailIsValid: false }));
      userInfo.updateEmail(value);
    } else if (name === 'authCode') {
      setIsValid((prev) => ({ ...prev, authCode: value }));
    } else if (name === 'password') {
      userInfo.updatePassword(value);
      checkValidPassword(value);
      if (isValid.passwordIsValid) console.log('사용가능한 비밀번호입니다');
    } else if (name === 'password-check') {
      setPasswordConfirm(value);
      if (userInfo.password === value) {
        isValid.passwordCheckIsValid = true;
        setMessagePw('일치하는 비밀번호 입니다.');
      } else {
        isValid.passwordCheckIsValid = false;
        setMessagePw('비밀번호가 일치하지 않습니다.');
      }
    } else if (name === 'username') {
      setIsValid((prev) => ({ ...prev, usernameIsValid: false }));
      userInfo.updateUsername(value);
    }
  };

  // 비밀번호 예외처리 -> 색 변경
  const checkValidPassword = (password: string): void => {
    // 숫자/영어/특수문자를 혼용했는가
    const pattern =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/;

    // 1~15자내인가
    const isValidLength = password.length >= 1 && password.length <= 15;
    setIsValid((prevState) => ({
      ...prevState,
      messageValidPw1Color: pattern.test(password) ? 'blue' : 'black',
      messageValidPw2Color: isValidLength ? 'blue' : 'black',
      passwordIsValid: pattern.test(password) && isValidLength,
    }));
  };

  // 이메일중복 및 형식체크 -> t/f
  const handleCheckEmailDuplicate = async (): Promise<Boolean> => {
    // const { data, isLoading } = await AuthApis.useCheckEmailDuplicateQuery(userInfo);
    const data = await AuthApis.checkEmailDuplicate(userInfo);
    return data;
  };

  // 닉네임 글자수 체크 -> t/f
  const checkValidUsername = (username: string): boolean => {
    //2~15자내인가
    const isValidLength = username.length >= 2 && username.length <= 15;
    setIsValid((prevState) => ({
      ...prevState,
      usernameIsValid: isValidLength,
    }));
    return isValidLength;
  };

  // 닉네임중복체크 -> t/f
  const handlecheckUsernameDuplicate = async (): Promise<Boolean> => {
    const data = await AuthApis.checkUsernameDuplicate(userInfo);
    return data;
  };

  // 버튼코드
  const onButtonClick = async (action: string): Promise<void> => {
    switch (action) {
      case 'onSetEmailCheck':
        console.log(`API 통신 ${userInfo.email}`);
        const res1 = await handleCheckEmailDuplicate();

        if (!res1)
          setMessageEmail('이메일 형식이 잘못됐거나 중복된 이메일입니다.');
        else {
          setMessageEmail('이메일로 전송된 인증코드를 입력해주세요.');
          setIsValid((prev) => ({ ...prev, emailIsValid: true }));
          break;
        }

      case 'onSetNicknameCheck':
        const res3 = checkValidUsername(userInfo.username);
        console.log(`API 통신 ${userInfo.username}`);
        const res2 = await handlecheckUsernameDuplicate();
        if (!res2) setMessageUsername('중복된 닉네임입니다');
        else if (!res3) {
          setMessageUsername('닉네임은 2~15자이내입니다.');
        } else if (res2 && res3) {
          setMessageUsername('사용 가능한 닉네임입니다');
          setIsValid((prev) => ({ ...prev, usernameIsValid: true }));
        }
        break;

      case 'onSignup':
        console.log(
          `회원가입 ${userInfo.email}, ${userInfo.password},${passwordConfirm}, ${userInfo.username}, ${isValid.authCode}`
        );

        if (
          isValid.passwordIsValid &&
          isValid.passwordCheckIsValid &&
          isValid.emailIsValid &&
          isValid.usernameIsValid
        ) {
          const res = await AuthApis.signup(
            userInfo,
            passwordConfirm,
            isValid.authCode
          );
          console.log(res, res);
          if (res.id) {
            navigate('/signin');
            alert(`${res.username}님 가입을 환영합니다`);
          } else alert(res.message);
        } else alert('회원가입에 실패했습니다. 입력 정보를 다시 확인해주세요.');
        break;

      default:
        console.error('error');
    }
  };

  return (
    <SignInWrapper>
      <SignInContainer>
        {/* email input */}
        <InputForm
          onChange={onChange}
          type='text'
          title='이메일'
          imgSVG='Email'
          name='email'
          value={userInfo?.email}
          placeholder='이메일 (xxx@naver.com)'
        />
        <Button
          onClick={() => onButtonClick('onSetEmailCheck')}
          backgroundColor='primary'
          label={'이메일 인증하기'}
        ></Button>
        <span> {messageEmail} </span>

        {/* emailToggle */}
        {isValid.emailIsValid ? (
          <div className='ToggleEmailCode-wrapper'>
            <InputForm
              imgSVG='Email'
              onChange={onChange}
              type='text'
              title='인증코드'
              name='authCode'
              value={isValid.authCode}
              placeholder='인증코드 입력'
            />
            <em onClick={() => onButtonClick('onSetEmailCheck')}>
              이메일을 받지 못하셨나요?
            </em>
          </div>
        ) : null}

        {/* pw input */}
        <InputForm
          onChange={onChange}
          type='password'
          title='비밀번호'
          name='password'
          imgSVG='Password'
          value={userInfo?.password}
          placeholder='비밀번호'
        />
        <br />
        <MessageValidPw color={isValid.messageValidPw1Color}>
          {' '}
          {messageValidPw1}{' '}
        </MessageValidPw>
        <MessageValidPw color={isValid.messageValidPw2Color}>
          {' '}
          {messageValidPw2}{' '}
        </MessageValidPw>
        {/* password duplicate check */}
        <InputForm
          onChange={onChange}
          type='password'
          imgSVG='Password'
          title='비밀번호 확인'
          name='password-check'
          value={passwordConfirm}
          placeholder='비밀번호 확인'
        />
        <span> {messagePw} </span>

        {/* username input */}
        <InputForm
          onChange={onChange}
          type='text'
          imgSVG='User'
          title='닉네임'
          name='username'
          value={userInfo?.username}
          placeholder='닉네임 (2~15자)'
        />
        <Button
          onClick={() => onButtonClick('onSetNicknameCheck')}
          label={'중복 확인'}
          backgroundColor='primary'
        ></Button>
        <span> {messageUsername} </span>
        <Button
          onClick={() => onButtonClick('onSignup')}
          label={'회원가입하기'}
          backgroundColor='secondary'
        ></Button>
        <br />
      </SignInContainer>
    </SignInWrapper>
  );
};

export default SignupPage;

// 스타일 적용
const MessageValidPw = styled.p<{ color: string }>`
  color: ${(props) => props.color};
  margin: 0 0 0.5rem;
  font-size: var(--font-size-xs);
`;

const SignInWrapper = styled.main`
  display: flex;
  padding: 2rem;
  align-items: center;
  justify-content: center;
`;

const SignInContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 70%;
  max-width: 361px;

  p {
    position: relative;
    font-size: var(--font-size-xs);
  }

  span {
    position: relative;
    margin-left: auto;
    padding: 0.5rem;
    font-size: var(--font-size-xs);
  }

  em {
    display: flex;
    position: relative;
    width: 100%;
    justify-content: flex-end;
    margin-left: auto;
    padding: 0.5rem;
    cursor: pointer;
    font-size: var(--font-size-xxs);
  }
`;
