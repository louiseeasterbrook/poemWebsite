import "./poemScreen.css";
import userPic from "../user.png";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Votes from "../components/Votes";
import ReactMarkdown from "react-markdown";
import MiniSplash from "../components/MiniSplash";

const PoemScreen = () => {
  let { id } = useParams();
  const [poem, setPoem] = useState([]);
  let updatedPoem = {};
  let newNum = 0;

  // GET DATA FROM SERVER
  useEffect(() => {
    axios.get(`http://localhost:3001/api/poems/${id}`).then((response) => {
      console.log("promise fulfilled");
      console.log(response.data);
      setPoem(response.data);
    });
  }, []);

  const updateVotes = () => {
    newNum = Number(poem.votes) + 1;
    updatedPoem = { ...poem, votes: newNum };

    axios
      .put(`http://localhost:3001/api/poems/${id}`, updatedPoem)
      .then((response) => {
        console.log(response.data);
        setPoem(updatedPoem);
      });
  };

  return (
    <>
      <MiniSplash />
      <div className="poemScreen">
        <h2 className="poemTitle">{poem.title}</h2>
        <div className="authorDisplay">
          <img src={userPic} alt="author" className="authorImg" />
          <p className="authorName">{poem.author}</p>
        </div>
        <ReactMarkdown className="poemText" children={poem.text} />
        <Votes votes={poem.votes} voteAdd={updateVotes} />
      </div>
    </>
  );
};

export default PoemScreen;
