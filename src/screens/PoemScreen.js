import "./poemScreen.css";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

//for awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

//components
import Notification from "../components/Notification";
import Votes from "../components/Votes";
import Loading from "../components/Loading";

//image
import image from "../img/download.jpg";

const PoemScreen = ({ poems, setPoems }) => {
  //holds fetched poem
  const [poem, setPoem] = useState([]);
  //variable to determine loading status
  const [show, setShow] = useState(false);
  //holds error from axios call
  const [error, setError] = useState("");
  //holds display that has been formated to be readable
  const [displayTime, setDisplayTime] = useState("");
  //temporarily holds updated poem
  let updatedPoem = {};
  //temporarily holds vote count
  let newNum = 0;

  let { id } = useParams();

  // GET DATA FROM SERVER
  useEffect(() => {
    axios
      .get(`/api/poems/${id}`)
      .then((response) => {
        setPoem(response.data);
        setDisplayTime(
          new Date(response.data.posted).toUTCString().slice(4, -7)
        );
        //stop loading
        setShow(true);
      })
      .catch((error) => {
        //stop loading
        setShow(true);
        setError("Poem not Found");
      });
  }, [id]);

  const updateVotes = () => {
    newNum = Number(poem.votes) + 1;
    updatedPoem = { ...poem, votes: newNum };

    //UPDATE POEM VOTES
    axios.post(`/api/poems/${id}/votes`, updatedPoem).then((response) => {
      //updates poem in current page
      setPoem(updatedPoem);

      //replaces old poem with updated poem in poem array
      let newPoems = poems.map((el) => (el.id === id ? updatedPoem : el));
      //updates poems list in app.js
      setPoems(newPoems);
    });
  };

  //if no error render poem screen
  return (
    <div className="poemDis-screen">
      {!show ? (
        <Loading />
      ) : error ? (
        <Notification message={error} />
      ) : (
        <div className="poemDis-inner">
          <div className="poemDis-top-section">
            <div className="poemDis-img-holder">
              <img src={image} alt="poem" />
            </div>
            <div className="poemDis-header">
              <h2 className="showTitle">{poem.title}</h2>
              <div className="authorDisplay">
                <FontAwesomeIcon icon={faUserCircle} className="user-icon" />
                <p className="authorName">{poem.author}</p>
              </div>
              <Votes votes={poem.votes} voteAdd={updateVotes} />
            </div>
          </div>

          <div className="poemDis-text-holder">
            <ReactMarkdown className="poemDis-text" children={poem.text} />
            <p className="poemDis-time">Posted: {displayTime}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoemScreen;
