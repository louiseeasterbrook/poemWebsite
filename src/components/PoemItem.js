import "./poemItem.css";
import { Link } from "react-router-dom";

//font awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faTrophy } from "@fortawesome/free-solid-svg-icons";

const PoemItem = (props) => {
  var firstLine = "";
  var secondLine = "";
  var thirdLine = "";

  //sets the value of first 3 lines
  const getLines = () => {
    if (props.poemText.split("\n")[0]) {
      firstLine = lengthCheck(props.poemText.split("\n")[0]);
    }
    if (props.poemText.split("\n")[1]) {
      secondLine = lengthCheck(props.poemText.split("\n")[1]);
    }
    if (props.poemText.split("\n")[2]) {
      thirdLine = lengthCheck(props.poemText.split("\n")[2]);
    }
  };

  //checks length of preview string
  //shortens preview string if too long
  const lengthCheck = (text) => {
    var final = "";
    return text.length > 35
      ? (final = text.substring(0, 40) + "...")
      : (final = text);
  };

  getLines();

  return (
    <div onClick={props.toPoem} className="poemItemContainer">
      <Link className="Linked" to={`/poem/${props.poemId}`}>
        <div className="poemContent">
          <h3>{props.poemTitle}</h3>
          <p>{firstLine}</p>
          <p>{secondLine}</p>
          <p>{thirdLine}</p>
        </div>

        <div className="bottomSection">
          <div className="authorSection">
            <FontAwesomeIcon icon={faUserCircle} className="userIcon" />
            <p className="authorName">{props.author}</p>
          </div>
          <div className="votesSection">
            <p>{props.votes}</p>
            <FontAwesomeIcon icon={faTrophy} className="trophyIcon" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PoemItem;
