import "./navBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navBar">
      <div className="navBarContainer">
        <h1>Poems</h1>

        <Link to="/add">Add</Link>
      </div>
    </div>
  );
};

export default NavBar;
