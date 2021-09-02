// import { Link } from "react-router-dom";
import "./votes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
// import { faFeather } from "@fortawesome/free-solid-svg-icons";

const PoemItem = (props) => {
  return (
    <div className="votesContainer">
      <p>{props.votes}</p>
      <button onClick={() => props.voteAdd()}>
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </div>
  );
};

export default PoemItem;
