import styled from '@emotion/styled';

export const Container = styled.div`
	width: 100vw;
	height: 100vh;
`;

export const Wrapper = styled.section`
	width: 100%;
	height: 100%;
	min-width: 768px;
	display: flex;
	flex-direction: row;
`;

export const MainWrapper = styled.div`
	width: calc(100% - 23rem);
	height: 100%;
	display: flex;
	flex-direction: row;
`;

export const SideWrapper = styled.div`
	width: 11.5rem;
	height: calc(100% - 1rem);
	background-color: var(--color-shark);
	margin: 0.5rem 0rem 0.5rem 0rem;
`;

export const FlexCenterWrapper =`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const ChattingRoomHeader =`
	background-color: var(--color-pumpkin);
	color: var(--color-white);
	border-radius: 5px 5px 0px 0px;
`;
