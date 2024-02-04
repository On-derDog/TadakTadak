import { Search } from "./Search"

interface SidebarProps{
  top: React.ReactNode;
  bottom: React.ReactNode;
}

interface SidebarItemProps {
  text: string;
  type: string;
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

  item: ({ text, type, onClick }: SidebarItemProps) => {
    switch (type) {
      case "list":
        return (
          <div className="Menu-list-item" onClick={onClick}>
            <span className="Menu-list-item-text">
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