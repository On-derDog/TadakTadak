import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../hooks/react-query/useUserData';
import { useLoginWebSocket } from '../hooks/custom-hook/useLoginWebSocket';
import { Sidebar } from '../components/welcome/Sidebar';
import { Search } from '../components/welcome/Search';
import { Favorite } from '../components/welcome/Favorite';
import Logo from '../assets/Logo.svg';
import Toast from '../components/common/Toast';
import { Container, Wrapper, SideWrapper, FlexCenterWrapper } from '../styles/Layout';
import styled from '@emotion/styled';
import { useStore } from 'zustand';
import { RoomInfo, RoomsInfo } from '../stores/useRoomStore';
import { UserInfoStore } from '../stores/UserInfoStore';
import RoomPreviewList from '../components/roomPreview/RoomPreviewList';
import CreateRoomPreview from '../components/roomPreview/CreateRoomPreview';
import { GetAllRoomsApis } from '../hooks/useGetAllRoom';

const WelcomePage = () => {
	const navigate = useNavigate();
	const clientConnected = useRef(false);
	const userinfo = useStore(UserInfoStore);
	const roominfo = useStore(RoomInfo);
	const [loginText, setLoginText] = useState('Login');
	const [showToast, setShowToast] = useState(false);
	const [CreateRoom, setCreateRoom] = useState(false);
	const { connect, unconnect } = useLoginWebSocket();
	const accessToken = localStorage.getItem('Accesstoken');
	const isLoggedIn = accessToken !== null;

	const handleCreateRoom = () => {
		setCreateRoom(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		roominfo.update(name, value);
		console.log(roominfo);
	};

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

    
    const {
		data: roomsPreviewListData,
		isLoading: roomsIsLoading,
		isError: roomsIsError,
	} = useQuery({
		queryKey: ['roomPreviewListData'],
		queryFn: GetAllRoomsApis.getAllRooms,
		staleTime: 3000,
		enabled: isLoggedIn,
	});

	useEffect(() => {
		if (isLoggedIn && userData) {
			setLoginText('Logout');
			connect(userData.username);
            userinfo.updateUsername(userData.username);
		} else {
			setLoginText('Login');
		}
	}, [isLoggedIn, userData]);

	useEffect(() => {
		if (isLoading) return;
		if (isError) {
			console.error('Error fetching user data:', isError);
			return;
		}
		if (!clientConnected.current) {
			clientConnected.current = true;
		}
	}, [isLoading, isError]);

	const handleLoginClick = () => {
		if (loginText === 'Login') {
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
										<Sidebar.item
											text="Create"
											type="list"
											svg="Create"
											onClick={handleCreateRoom}
										/>
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
									text={loginText}
									type="list"
									svg="Logout"
									onClick={handleLoginClick}
								/>
							}
						/>
					</SideWrapper>
					<MainContainer>
						<RoomPreviewList />
						{CreateRoom && (
							<CreateRoomPreview
								onClose={() => setCreateRoom(false)}
								handleInputChange={handleInputChange}
								username={userinfo.username}
								roominfo={roominfo}
							/>
						)}
					</MainContainer>
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

const SideContainer = styled.section`
`

const LogoDiv = styled.div`
	padding: 12px 16px 0;
`;

const MainContainer = styled.div`
	${FlexCenterWrapper}
`;

