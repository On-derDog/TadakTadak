import { Sidebar } from "../components/Sidebar";
import { Search } from "../components/Search";
import { Favorite } from "../components/Favorite";
import Logo from "../assets/Logo.svg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Wrapper, SideWrapper, MainWrapper } from "../styles/Layout";
import styled from '@emotion/styled';
import { UserInfoStore } from "../stores/UserInfoStore";
import { useStore } from "zustand"
import ChattingRoomList from "../components/chattingRoomList/ChattingRoomList"

const WelcomePage = () => {
    const [Logintext, setLoginText] = useState("Login");
    const userinfo = useStore(UserInfoStore);

    const navigate = useNavigate();

    const handleLoginClick = () => {
        if (Logintext === "Login") {
            navigate("/signin");
        } else {
            setLoginText("Logout");
        }
    };

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
            {userinfo.username || '유저명'}
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

            <Sidebar.line/>

            {/* Favorite */}
            <Sidebar.item text="Favorite" type="list" svg="Star" />
            <Favorite />
            </>
            }
        bottom={<Sidebar.item text={Logintext} type="list" svg="Logout" onClick={handleLoginClick} />}
        />
        </SideWrapper>

        
        <ChattingRoomList/>
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

const LogoDiv = styled.div`
    padding: 12px 16px 0;
`