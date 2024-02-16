import styled from '@emotion/styled';

interface KickBtnProps {
	onClick: () => void; // onClick prop 추가
}

const KickBtn: React.FC<KickBtnProps> = ({ onClick }) => {
	return <StyledKickBtn onClick={onClick}>Kick</StyledKickBtn>;
};

export default KickBtn;

const StyledKickBtn = styled.button`
	/* 버튼 스타일 */
`;
