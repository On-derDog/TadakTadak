import { Sidebar } from "../components/welcome/Sidebar";
import { Search } from "../components/welcome/Search";
import { Favorite } from "../components/welcome/Favorite";
import Logo from "../assets/Logo.svg"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Wrapper, SideWrapper, FlexCenterWrapper } from "../styles/Layout";
import styled from '@emotion/styled';
import { UserInfoStore } from "../stores/UserInfoStore";
import { RoomInfo } from "../stores/useRoomStore"
import { useStore } from "zustand"
import RoomPreviewList from "../components/roomPreview/RoomPreviewList";
import CreateRoomPreview from "../components/roomPreview/CreateRoomPreview";
import { getUserData } from "../hooks/react-query/useUserData";
import { GetAllRoomsApis } from "../hooks/useGetAllRoom"

const WelcomePage = () => {
    const [Logintext, setLoginText] = useState("Login");
    const [CreateRoom, setCreateRoom] = useState(false);
    const userinfo = useStore(UserInfoStore);
    const roominfo = useStore(RoomInfo);

    const navigate = useNavigate();

    const handleCreateRoom= () =>{
        setCreateRoom(true);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        roominfo.update(name, value);
        console.log(roominfo);
    };

    const handleLoginClick = () => {
        if (Logintext === "Login") {
            navigate("/signin");
        } else {
            setLoginText("Logout");
        }
    };

    // username 불러오기
    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await getUserData();
            userinfo.updateUsername(data.username);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
            const res = await GetAllRoomsApis.getAllRooms();
            console.log(res);
            } catch (error) {
            console.error('Error fetching rooms:', error);
            }
        };
    
        fetchData();
    
        const intervalId = setInterval(() => {
            fetchData();
        }, 10000);
    
        return () => clearInterval(intervalId);
    }, []);

    return (
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
            
            <ServiceText>
                TadakTadak
            </ServiceText>
            <UsernameText>
            
            {/* API로 가져오게 변경필요 => 새로고침시 사라져서 Create에도 문제 */}
            {userinfo.username || '유저명'} 
            </UsernameText>

            {/* Search */}
            <Search />

            {/* Menu */}
            <div className="Menu-list">
                <Sidebar.item text="Home" type="list" svg="Home" />
                <Sidebar.item text="Create" type="list" svg="Create" onClick={handleCreateRoom} />
            </div>

            <Sidebar.item text="Category 1" type="category" />
            <Sidebar.item text="Category 2" type="category" />

            <Sidebar.line/>

            {/* Favorite */}
            <Sidebar.item text="Favorite" type="list" svg="Star" />
            <Favorite />
            </>
            }
        bottom={<Sidebar.item text={Logintext} type="list" svg="Logout" onClick={handleLoginClick} />}
        />
        </SideWrapper>

        <MainContainer>
            <RoomPreviewList/>
            {CreateRoom && <CreateRoomPreview onClose={() => setCreateRoom(false)}handleInputChange={handleInputChange} username={userinfo.username} roominfo={roominfo} />}
        </MainContainer>
        </Wrapper>
    </Container>
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