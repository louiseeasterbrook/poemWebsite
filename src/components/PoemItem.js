import "./poemItem.css";
import userPic from "../user.png";
// import { Link } from "react-router-dom";

const PoemItem = () => {
  return (
    <div className="poemItemContainer">
      <div className="poemContent">
        <h1>Poem Title</h1>
        <p>
          this is the 1poem
          <br /> line second <br />
          line third line....
        </p>
      </div>

      <div className="authorSection">
        <img src={userPic} alt="author" className="authorImg" />
        <p className="authorName">Louise Easterbrok</p>
      </div>
    </div>
  );
};

export default PoemItem;
