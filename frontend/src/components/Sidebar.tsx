import { Search } from "./Search"

export const Sidebar ={

  wrapper: ({ top, bottom }) => (
    <div className="Sidebar-wrapper">
      <div className="Sidebar-top">
        {top}
      </div>

      <div className="Sidebar-bottom">
        {bottom}
      </div>
    </div>
  ),

  item: ({ text, type }: { text: string; type: string }) => {
    switch (type) {
      case "list":
        return (
          <div className="Menu-list-item">
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