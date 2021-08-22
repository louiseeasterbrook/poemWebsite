// import { Link } from "react-router-dom";
import "./votes.css";

const PoemItem = (props) => {
  return (
    <div className="votesContainer">
      <p>{props.votes}</p>
      <button onClick={() => console.log}>^</button>
    </div>
  );
};

export default PoemItem;
