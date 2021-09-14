import "./poemScreen.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

//components
import Notification from "../components/Notification";
import Votes from "../components/Votes";

const PoemScreen = ({ poems, setPoems }) => {
  let { id } = useParams();
  const [poem, setPoem] = useState([]);
  let updatedPoem = {};
  let newNum = 0;
  const [error, setError] = useState("");

  // GET DATA FROM SERVER
  useEffect(() => {
    axios
      .get(`/api/poems/${id}`)
      .then((response) => {
        setPoem(response.data);
      })
      .catch((error) => {
        setError("Poem not Found");
      });
  }, []);

  const updateVotes = () => {
    newNum = Number(poem.votes) + 1;
    updatedPoem = { ...poem, votes: newNum };

    //UPDATE POEM VOTES
    axios
      .post(`http://localhost:3001/api/poems/${id}`, updatedPoem)
      .then((response) => {
        //updates poem in current page
        setPoem(updatedPoem);

        //replaces old poem with updated poem in poem array
        let newPoems = poems.map((el) => (el.id === id ? updatedPoem : el));
        //updates poems list in app.js
        setPoems(newPoems);
      });
  };

  //render error if error has occured
  if (Boolean(error)) {
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
          <div className="poemHolder">
            <ReactMarkdown className="poemScreenText" children={poem.text} />
          </div>
          <Votes votes={poem.votes} voteAdd={updateVotes} />
          <Link to={`/update/${id}`} yes={poem.author}>
            <button>Update</button>
          </Link>
        </div>
      </div>
    );
  }
};

export default PoemScreen;
