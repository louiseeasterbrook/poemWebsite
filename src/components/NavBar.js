import "./navBar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";

//font awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faBars,
  faHome,
  faTimes,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ setSearchVal, setSearchPress, searchVal }) => {
  let history = useHistory();
  const [sidebar, setSidebar] = useState(false);

  //side bar toggle
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  //search bar submit function
  const submitSearch = (e) => {
    e.preventDefault();
    //check if earch is blank
    if (searchVal.trim() !== "") {
      setSearchPress(true);
      history.push("/searchResults");
    }
  };

  //update search input value
  const updateSearch = (e) => {
    setSearchVal(e.target.value);
  };

  return (
    <div className="nav-container">
      <div className="top-nav-bar">
        <div className="top-nav-bar-inner">
          <div className="title-container">
            <FontAwesomeIcon
              icon={sidebar ? faTimes : faBars}
              className="menu-btn icon"
              onClick={showSidebar}
            />

            <Link to="/">
              <h1 className="long-title">Word Collections</h1>
              <h1 className="mobile-title">WC</h1>
            </Link>
          </div>

          <div className="search-container">
            <form onSubmit={submitSearch}>
              <input
                placeholder="Search.."
                onChange={updateSearch}
                value={searchVal}
              />
              <button>
                <FontAwesomeIcon
                  icon={faSearch}
                  className="search-icon"
                  type="submit"
                />
              </button>
            </form>
          </div>
        </div>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-list">
          <Link to="/">
            <li className="nav-item">
              <FontAwesomeIcon icon={faHome} className="menu-icon" />
              <h3>Home</h3>
            </li>
          </Link>
          <Link to="/add">
            <li className="nav-item">
              <FontAwesomeIcon icon={faPlus} className="menu-icon" />
              <h3>Add Poem</h3>
            </li>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
