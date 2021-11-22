import "./footer.css";

//font awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";

const NavBar = () => {
  return (
    <div className="footer-outer">
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
      <div className="footer-links-holder">
        <a>Privacy </a>
        <a>Terms of use </a>
        <a>Advertising</a>
      </div>
    </div>
  );
};

export default NavBar;
