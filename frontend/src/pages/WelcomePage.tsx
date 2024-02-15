import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../hooks/react-query/useUserData';
import { useLoginWebSocket } from '../hooks/custom-hook/useLoginWebSocket';
import { Sidebar } from '../components/Sidebar';
import { Search } from '../components/Search';
import { Favorite } from '../components/Favorite';
import Logo from '../assets/Logo.svg';
import Toast from '../components/Toast';
import { Container, Wrapper, SideWrapper } from '../styles/Layout';
import styled from '@emotion/styled';

const WelcomePage = () => {
	const [Logintext, setLoginText] = useState('Login');
	const [showToast, setShowToast] = useState(false);
	const { connect, publishUser, unconnect } = useLoginWebSocket();
	const navigate = useNavigate();
	const accessToken = localStorage.getItem('Accesstoken');
	const isLoggedIn = accessToken !== null;
	const clientConnected = useRef(false);

	const {
		data: userData,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['userData'],
		queryFn: getUserData,
		staleTime: 5000,
		enabled: isLoggedIn,
	});

	useEffect(() => {
		if (isLoggedIn) {
			setLoginText('Logout');
			connect();
			if (clientConnected.current && userData) {
				publishUser(userData.username, '');
			}
		} else {
			setLoginText('Login');
		}
	}, [isLoggedIn]);

	useEffect(() => {
		if (isLoading) return;
		if (isError) {
			// Handle error fetching user data
			return;
		}
		if (!clientConnected.current) {
			clientConnected.current = true;
		}
	}, [isLoading, isError]);

	const handleLoginClick = () => {
		if (Logintext === 'Login') {
			navigate('/signin');
		} else {
			localStorage.removeItem('Accesstoken');
			localStorage.removeItem('Refreshtoken');
			unconnect();
			setLoginText('Login');
			setShowToast(true);
		}
	};

	return (
		<>
			{/* 전체 컴포넌트와 토스트 컴포넌트 함께 보여주기 */}
			<Container>
				<Wrapper>
					<SideWrapper>
						<Sidebar.wrapper
							top={
								<>
									{/* Logo */}
									<LogoDiv>
										<img src={Logo} alt="logo" width="56px" height="56px" />
									</LogoDiv>

									<ServiceText>TadakTadak</ServiceText>
									<UsernameText>
										{isLoggedIn ? userData?.username : '로그인이 필요한 서비스입니다.'}
									</UsernameText>

									{/* Search */}
									<Search />

									{/* Menu */}
									<div className="Menu-list">
										<Sidebar.item text="Home" type="list" svg="Home" />
										<Sidebar.item text="Create" type="list" svg="Create" />
									</div>

									<Sidebar.item text="Category 1" type="category" />
									<Sidebar.item text="Category 2" type="category" />

									<Sidebar.line />

									{/* Favorite */}
									<Sidebar.item text="Favorite" type="list" svg="Star" />
									<Favorite />
								</>
							}
							bottom={
								<Sidebar.item
									text={Logintext}
									type="list"
									svg="Logout"
									onClick={handleLoginClick}
								/>
							}
						/>
					</SideWrapper>
				</Wrapper>
			</Container>
			{showToast && <Toast messageType="logout" type="success" />}
		</>
	);
};

export default WelcomePage;

const ServiceText = styled.div`
	font-size: var(--font-size-lg);
	padding: 12px 16px;
	font-weight: 700;
`;

const UsernameText = styled.div`
	font-size: var(--font-size-sm);
	padding: 0px 16px;
`;

const LogoDiv = styled.div`
	padding: 12px 16px 0;
`;
