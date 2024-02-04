import { Sidebar } from "../components/Sidebar";
import { Search } from "../components/Search";
import { Favorite } from "../components/Favorite";

const WelcomePage = () => {
  return (
    <div className="WelcomePage-wrapper">
      <>It's Home!</>
      <Sidebar.wrapper
        top={
          <>
            {/* Logo */}
            <div className="Logo" />
            <span className="service-text" />
            <span className="username-text" />

            {/* Search */}
            <Search />

            {/* Menu */}
            <div className="Menu-list">
                <Sidebar.item text="Home" type="list"/>
                <Sidebar.item text="Create" type="list"/>
            </div>
            <Sidebar.item text="Category 1" type="category"/>

            <span>-----</span>

            {/* Favorite */}
            <Sidebar.item text="Favorite" type="list"/>
            <Favorite/>
          </>
        }

        bottom={<Sidebar.item text="Logout" type="list" />}
      />
    </div>
  );
};

export default WelcomePage;
