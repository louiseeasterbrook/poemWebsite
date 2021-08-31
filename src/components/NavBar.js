import "./navBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navBar">
      <div className="navBarContainer">
        <Link className="pageTitle" to="/">
          Word Collections
        </Link>

        <Link className="navBtn-large navBtn" to="/add">
          Add
        </Link>

        <Link className="navBtn-small navBtn" to="/add">
          +
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
