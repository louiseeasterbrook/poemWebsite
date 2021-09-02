import "./topSplash.css";
import { Link } from "react-router-dom";

const TopSplash = () => {
  return (
    <div className="topSplashContainer">
      <div className="content">
        <h2>A Place for Poem Lovers</h2>
        <p>Explore an archive of poems</p>
        <p>Or add your own masterpiece to the collection</p>
        <Link to={"/add"}>
          <button className="splashButton">Submit your first Poem</button>
        </Link>
      </div>
    </div>
  );
};

export default TopSplash;
