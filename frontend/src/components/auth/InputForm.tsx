import EmailSVG from "../../assets/Email.svg"
import UserSVG from "../../assets/User.svg"
import PasswordSVG from "../../assets/Password.svg"

import styled from "@emotion/styled";


function ChangeSVG(imgSVG: string){
  switch(imgSVG){
    case "Email":
      return EmailSVG;
    case "User":
      return UserSVG;
    case "Password":
      return PasswordSVG;
  }
}

export const InputForm = ({ type, name, value, onChange, placeholder, title, imgSVG, ...rest }) => {
  return (
    <InputFormWrapper>
      <p>{title}</p>
      <InputFormContainer>
      <picture>
        <img src={ChangeSVG(imgSVG)} alt="img"/>
      </picture>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
      </InputFormContainer>
    </InputFormWrapper>
  );
};

const InputFormWrapper = styled.section`
  p {
    font-size: var(--font-size-xs);
    margin: 0;
    padding: 1rem 0.5rem 0.3rem;
  }
`

const InputFormContainer = styled.div`
  height: 44px;
  display: flex;
  gap: 16px;
  align-items: center;
  border-radius: 10px;
  padding: 0 11px;

  picture {

  }

  input {
    font-size: var(--font-size-xs);
    border: none;
    outline: none;
  }

  border: solid 1px var(--color-crusta)
`