import "./poemItem.css";
import userPic from "../user.png";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const PoemItem = (props) => {
  var firstLine = "";
  var secondLine = "";
  var thirdLine = "";
  const getLines = () => {
    if (props.poemText.split("\n")[0]) {
      firstLine = props.poemText.split("\n")[0];
    }
    if (props.poemText.split("\n")[1]) {
      secondLine = props.poemText.split("\n")[1];
    }
    if (props.poemText.split("\n")[2]) {
      thirdLine = props.poemText.split("\n")[2];
    }
  };

  getLines();

  return (
    <div onClick={props.toPoem} className="poemItemContainer">
      <Link to={`/poem/${props.poemId}`}>
        <div className="poemContent">
          <h1>{props.poemTitle}</h1>
          <p>{firstLine}</p>
          <p>{secondLine}</p>
          <p>{thirdLine}</p>
        </div>

        <div className="authorSection">
          <img src={userPic} alt="author" className="authorImg" />
          <p className="authorName">{props.author}</p>
        </div>
      </Link>
    </div>
  );
};

export default PoemItem;
