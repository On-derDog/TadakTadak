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
    <div className="Sidebar-wrapper">
      <div className="Sidebar-top">
        {top}
      </div>

      <div className="Sidebar-bottom">
        {bottom}
      </div>
    </div>
  ),

  item: ({ text, type, svg, onClick }: SidebarItemProps) => {
    const SvgComponent = getSVG(svg);
    switch (type) {
      case "list":
        return (
          <div className="Menu-list-item" onClick={onClick}>
            <span className="Menu-list-item-text">
              {SvgComponent && <img src={SvgComponent} alt={text} />}
              {text}
            </span>
          </div>
        );
  
      case "category":
        return (
          <div className="Menu-category-item">
            <span className="Menu-category-item-text">
              {text}
            </span>
          </div>
        );
  
      default:
        return null; 
    }
  }
  ,
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