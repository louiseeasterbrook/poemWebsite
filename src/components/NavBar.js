import "./navBar.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFeather } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  return (
    <div className="navBar">
      <div className="navBarContainer">
        {/* <FontAwesomeIcon icon={faFort} /> */}
        <div className="logo">
          <Link className="pageTitle" to="/">
            Word Collections
          </Link>
          <FontAwesomeIcon icon={faFeather} className="featherIcon" />
        </div>
        <Link className="navBtn-large navBtn" to="/add">
          Add
        </Link>

        <Link className="navBtn-small navBtn" to="/add">
          <FontAwesomeIcon icon={faPlus} className="plusIcon" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
