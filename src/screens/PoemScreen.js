import "./poemScreen.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

//components
import Notification from "../components/Notification";
import Votes from "../components/Votes";
import Loading from "../components/Loading";

const PoemScreen = ({ poems, setPoems }) => {
  const [poem, setPoem] = useState([]);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  let { id } = useParams();
  let updatedPoem = {};
  let newNum = 0;
  let history = useHistory();

  // GET DATA FROM SERVER
  useEffect(() => {
    axios
      .get(`/api/poems/${id}`)
      .then((response) => {
        setPoem(response.data);
        setShow(true);
      })
      .catch((error) => {
        setError("Poem not Found");
      });
  }, []);

  const updateVotes = () => {
    newNum = Number(poem.votes) + 1;
    updatedPoem = { ...poem, votes: newNum };

    //UPDATE POEM VOTES
    axios.post(`/api/poems/${id}`, updatedPoem).then((response) => {
      //updates poem in current page
      setPoem(updatedPoem);

      //replaces old poem with updated poem in poem array
      let newPoems = poems.map((el) => (el.id === id ? updatedPoem : el));
      //updates poems list in app.js
      setPoems(newPoems);
    });
  };

  const deletePoem = () => {
    axios.delete(`http://localhost:3001/api/poems/${id}`).then((response) => {
      //removes poem from poem array
      let newPoems = poems.filter((el) => el.id !== id);

      //updates poems list in app.js
      setPoems(newPoems);
      //navigate back to home screen
      history.push("/");
    });
  };

  //conditional rendering
  if (!show) {
    return (
      <div className="load-screen">
        <Loading />
      </div>
    );
  } else if (Boolean(error)) {
    //render error if error has occured
    return (
      <div className="poemScreen">
        <div className="poemScreenContent">
          <Notification message={error} show={true} />
        </div>
      </div>
    );
  } else {
    //if no error render poem screen
    return (
      <div className="poemScreen">
        <div className="poemScreenContent">
          <h2 className="showTitle">{poem.title}</h2>
          <div className="authorDisplay">
            <FontAwesomeIcon icon={faUserCircle} className="userIcon" />
            <p className="authorName">{poem.author}</p>
          </div>

          <div className="poembtn-holder">
            <Votes votes={poem.votes} voteAdd={updateVotes} />

            <Link to={`/update/${id}`} yes={poem.author}>
              <button className="updatebtn btn">Update</button>
            </Link>
            <button onClick={deletePoem} className="deletebtn btn">
              Delete
            </button>
          </div>

          <div className="poemHolder">
            <ReactMarkdown className="poemScreenText" children={poem.text} />
          </div>
        </div>
      </div>
    );
  }
};

export default PoemScreen;
