export const Sidebar = () =>{
  return(
    <div className="Sidebar-wrapper">
      <div className="Sidebar-top">
        <div className="Profile">
          <div className="avatar"/>
        </div>
        <span className="service-text"/>
        <span className="username-text"/>

        <div className="Search">
          <div className="Icons"/>
          <span className="Seach-text"/>
        </div>

        {/* Menu */}
        <div className="Menu">
          <div className="Menu-list">
            <div className="Menu-list-item">
              <span className="Menu-list-item-text">
                "text"
              </span>
            </div>
          </div>
          <div className="Menu-category">
            <div className="Menu-category-item">
              <span className="Menu-category-item-text">
                Category
              </span>
            </div>
          </div>
          Line
          <div className="Menu-list-item">
              <span className="Menu-list-item-text">
                "Favorite"
              </span>
          </div>
          <div className="Favorite">
            <div className="Favorite-item">
              <div className="Favorite-item"/>
            </div>
          </div>
        </div>
      </div>


      <div className="Sidebar-bottom">
        <div className="Menu-list-item">
          <span className="Menu-list-item-text">
            "Logout"
          </span>
        </div>
      </div>
    </div>
  )
}