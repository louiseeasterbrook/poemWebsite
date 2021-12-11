import "./poemItem.css";
import { Link } from "react-router-dom";

//font awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faUserCircle } from "@fortawesome/free-solid-svg-icons";

//image
import image from "../img/download.jpg";

const PoemItem = ({
  poem,
  profile,
  setOpenDelModal,
  setOpenEditModal,
  setSelectedPoem,
}) => {
  let firstLine = "";
  let secondLine = "";
  let thirdLine = "";

  //format the time
  let time = new Date(poem.posted);
  let writtenDate = time.toUTCString().slice(4, -7);

  //sets the value of first 3 lines
  const getLines = () => {
    if (poem.text.split("\n")[0]) {
      firstLine = lengthCheck(poem.text.split("\n")[0]);
    }
    if (poem.text.split("\n")[1]) {
      secondLine = lengthCheck(poem.text.split("\n")[1]);
    }
    if (poem.text.split("\n")[2]) {
      thirdLine = lengthCheck(poem.text.split("\n")[2]);
    }
  };

  //checks length of preview string
  //shortens preview string if too long
  const lengthCheck = (text) => {
    return text.length > 65 ? text.substring(0, 65) + "..." : text;
  };

  getLines();

  const deletePress = (event) => {
    //stop link being triggered
    event.preventDefault();
    event.stopPropagation();

    //open modal
    setOpenDelModal(true);
    setSelectedPoem(poem);
  };

  const editPress = (event) => {
    //stop link being triggered
    event.preventDefault();
    event.stopPropagation();

    //open modal
    setOpenEditModal(true);

    setSelectedPoem(poem);
  };

  return (
    <div className="poemItem-container">
      <Link className="linked" to={`/poem/${poem.id}`}>
        <div className="poem-image-holder">
          <img
            // src={`./uploads/${poem.articleImage}`}
            src={image}
            className="poem-img"
            alt="poem"
          />
        </div>

        <div className="poem-content">
          {profile ? (
            <div className="dropdown">
              <FontAwesomeIcon icon={faEllipsisH} className="dropbtn" />
              <div className="dropdown-content">
                <p onClick={editPress}>Edit </p>
                <p onClick={deletePress}>Delete</p>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="poemItem-top">
            <h2>{poem.title}</h2>

            <p>{firstLine}</p>
            <p>{secondLine}</p>
            <p>{thirdLine}</p>
          </div>
          <div className="poemItem-bottom">
            <div className="author-section">
              <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
              <p className="authorName">{poem.author}</p>
            </div>
            <p className="poemItem-time">{writtenDate}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PoemItem;
