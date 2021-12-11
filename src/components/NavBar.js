import "./navBar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";

//components
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

//font awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ isAuthenticated, user, setOpenModal }) => {
  let history = useHistory();
  const [sidebar, setSidebar] = useState(false);
  const [secondNavbar, setSecondNavbar] = useState(false);

  //check for scrolling to activate navbar
  const scrollCheck = () => {
    if (window.scrollY >= 70) {
      setSecondNavbar(true);
    } else {
      setSecondNavbar(false);
    }
  };

  //close sidebar if page excedes 650px
  const pageWidthCheck = () => {
    if (window.innerWidth > 650) {
      setSidebar(false);
    }
  };

  //trigger scrollCheck function on scroll
  window.addEventListener("scroll", scrollCheck);
  //trigger page width
  window.addEventListener("resize", pageWidthCheck);

  //side bar toggle
  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      <div className={secondNavbar ? "nav-container active" : "nav-container"}>
        <div className="nav-bar-inner">
          <Link to="/" className="page-title">
            <h2>Word Collections</h2>
          </Link>

          {isAuthenticated && user ? (
            <nav className="top-nav">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <p className="nav-link " onClick={() => setOpenModal(true)}>
                Add Poem
              </p>
              <div className="nav-profile">
                <img
                  className="nav-image"
                  src={user.picture}
                  alt="user"
                  onClick={() => history.push("/profile")}
                />
              </div>
              <LogoutButton />
            </nav>
          ) : (
            <>
              <nav className="top-nav">
                <Link className="nav-link" to="/">
                  Home
                </Link>
                <p className="nav-link add-poem-link">Add Poem</p>
                <LoginButton />
              </nav>
            </>
          )}
          {sidebar ? (
            <FontAwesomeIcon
              icon={faTimes}
              onClick={showSidebar}
              className={
                secondNavbar ? "sidebar-btn active-sb-btn" : "sidebar-btn"
              }
            />
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              onClick={showSidebar}
              className={
                secondNavbar ? "sidebar-btn active-sb-btn" : "sidebar-btn"
              }
            />
          )}
        </div>
      </div>
      <div
        className={
          sidebar ? "sidebar-container active-sidebar" : "sidebar-container"
        }
      >
        {isAuthenticated && user ? (
          <nav className="side-nav">
            <div className="nav-profile">
              <img
                className="nav-image"
                src={user.picture}
                alt="user"
                onClick={() => history.push("/profile")}
              />
            </div>
            <Link className="nav-link" to="/">
              Home
            </Link>
            <p className="nav-link " onClick={() => setOpenModal(true)}>
              Add Poem
            </p>
            <LogoutButton />
          </nav>
        ) : (
          <>
            <nav className="side-nav">
              <Link className="nav-link" to="/">
                Home
              </Link>
              <p className="nav-link add-poem-link">Add Poem</p>
              <LoginButton />
            </nav>
          </>
        )}
      </div>
    </>
  );
};

export default NavBar;
