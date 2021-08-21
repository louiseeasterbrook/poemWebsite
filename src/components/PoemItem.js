import "./poemItem.css";
import userPic from "../user.png";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const PoemItem = (props) => {
  console.log(props.text);
  return (
    <div onClick={props.toPoem} className="poemItemContainer">
      <Link to={`/poem/${props.poemId}`}>
        <div className="poemContent">
          <h1>{props.poemTitle}</h1>
          <p>{props.poemText}</p>
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
