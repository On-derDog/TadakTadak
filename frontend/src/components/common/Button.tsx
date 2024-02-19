import styled from '@emotion/styled';

function changeColor(backgroundColor) {
  switch (backgroundColor) {
    case 'primary':
      return 'var(--color-buttercap)';
    case 'secondary':
      return 'var(--color-shark)';
  }
}

export const Button = ({ onClick, label, backgroundColor, ...rest }) => {
  return (
    <StyledButton
      onClick={onClick}
      backgroundColor={changeColor(backgroundColor)}
      {...rest}
    >
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  height: 49px;
  padding: 10px 20px;
  margin: 0.5rem 0;
  background-color: ${(props) =>
    props.backgroundColor || 'var(--color-buttercap)'};
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;
  align-items: center;

  &:hover {
    background-color: #000000;
  }
`;
