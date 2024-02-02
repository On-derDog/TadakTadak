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
	height: 100%;
	background-color: gray;
`;
