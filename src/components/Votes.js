import "./votes.css";

//font awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const PoemItem = (props) => {
  return (
    <div className="votesContainer">
      <p>{props.votes}</p>
      <button onClick={() => props.voteAdd()}>
        <FontAwesomeIcon icon={faArrowUp} className="up-icon" />
      </button>
    </div>
  );
};

export default PoemItem;
