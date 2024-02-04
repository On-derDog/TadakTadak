import { Sidebar } from "../components/Sidebar";
import { Search } from "../components/Search";
import { Favorite } from "../components/Favorite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Wrapper, SideWrapper } from "../styles/Layout";
import styled from '@emotion/styled';

const WelcomePage = () => {
    const [Logintext, setLoginText] = useState("Login");
    const [username,setUsername] = useState<string>('타닥이');

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
            <div className="Logo" />
            <ServiceText>
            TadakTadak
            </ServiceText>
            <UsernameText>
            {username}
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
    </Wrapper>
    </Container>
  );
};

export default WelcomePage;

const ServiceText = styled.div`
    font-size: var(--font-size-lg);
    padding: 12px 16px;
`;

const UsernameText = styled.div`
    font-size: var(--font-size-sm);
    padding: 0px 16px;
`;