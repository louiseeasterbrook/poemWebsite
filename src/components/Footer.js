import "./footer.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

const NavBar = () => {
  return (
    <div className="footer-outer">
      <p>Word Collections 2021</p>
      <div className="social-holder">
        <FontAwesomeIcon
          icon={faFacebookSquare}
          className="fb-icon icon"
          onClick={() => window.open("https://facebook.com", "_blank")}
        />
        <FontAwesomeIcon
          icon={faInstagram}
          className="insta-icon icon"
          onClick={() => window.open("https://instagram.com", "_blank")}
        />
        <FontAwesomeIcon
          icon={faTwitterSquare}
          className="twitter-icon icon"
          onClick={() => window.open("https://twitter.com", "_blank")}
        />
      </div>
    </div>
  );
};

export default NavBar;
