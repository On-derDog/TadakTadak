import styled from '@emotion/styled';
import Home from "../assets/Home.svg"
import Create from "../assets/Create.svg"
import Star from "../assets/Star.svg"
import Logout from "../assets/Logout.svg"

interface SidebarProps{
  top: React.ReactNode;
  bottom: React.ReactNode;
}

interface SidebarItemProps {
  text: string;
  type: string;
  svg?: string;
  onClick?: () => void;
}



export const Sidebar ={
  wrapper: ({ top, bottom }: SidebarProps) => (
    <SidebarWrapper>
      <SidebarTop>
        {top}
      </SidebarTop>

      <SidebarBottom>
        {bottom}
      </SidebarBottom>
    </SidebarWrapper>
  ),

  item: ({ text, type, svg, onClick }: SidebarItemProps) => {
    const SvgComponent = getSVG(svg);
    switch (type) {
      case "list":
        return (
          <MenuListItem onClick={onClick}>
            <Icons>
              {SvgComponent && <img src={SvgComponent} alt={text} />}
            </Icons>
            <MenuListItemText>{text}</MenuListItemText>
          </MenuListItem>
        );
  
      case "category":
        return (
          <MenuCategoryItem>
            <MenuCategoryItemText>
              {text}
            </MenuCategoryItemText>
          </MenuCategoryItem>
        );
  
      default:
        return null; 
    }
  }
  ,

  line: ()=>{
    return(<Line/>)
  }
}

const getSVG = (svg: string) => {
  switch (svg) {
    case "Home":
      return Home;
    case "Create":
      return Create;
    case "Star":
      return Star;
    case "Logout":
      return Logout;
    default:
      return null; 
  }
};


const MenuListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 10px;
  width: 139px;
  height: 48px;
  position: relative;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--color-mercury); 
    cursor: pointer;
  }
`;

const Icons = styled.div`
  width: 24px;
  height: 24px;
`;

const MenuListItemText = styled.span`
  width: 46px;
  height: 22px;
  font-size: var(--font-size-md);
  line-height: 140%;
  color: var(--color-rangoongreen);
`;

const MenuCategoryItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 16px 0px 40px;
  gap: 16px;
  height: 30px;
  position: relative;
  flex: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--color-mercury);
    cursor: pointer; 
  }
`;


const MenuCategoryItemText = styled.span`
  width: 70px;
  height: 20px;
  font-size: var(--font-size-sm);
  line-height: 140%;
  color: var(--color-rangoongreen);
`;


const SidebarWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 32px;
  background: var(--color-white);
  border-right: 1px solid var(--color-mercury);
  height: 100%; 
  padding-bottom: 32px; 
`;

const SidebarTop = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;
  gap: 11px;
  align-self: stretch;
`;

const SidebarBottom = styled.div`
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
  margin-top: auto;
`;

const Line= styled.div`
  display: flex;
  width: 70%;
  margin: 0 auto;
  border: 1px solid var(--color-mercury);
`