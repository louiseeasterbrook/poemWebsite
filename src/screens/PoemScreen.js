import "./poemScreen.css";
import userPic from "../user.png";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

const PoemScreen = () => {
  let { id } = useParams();
  const [poem, setPoem] = useState([]);

  //GET DATA FROM SERVER
  useEffect(() => {
    console.log("effect");
    axios.get(`http://localhost:3001/api/poems/${id}`).then((response) => {
      console.log("promise fulfilled");
      console.log(response.data);
      setPoem(response.data);
    });
  }, []);

  console.log(poem.author);

  return (
    <div className="poemScreen">
      <h2 className="poemTitle">{poem.title}</h2>
      <div className="authorDisplay">
        <img src={userPic} alt="author" className="authorImg" />
        <p className="authorName">{poem.author}</p>
      </div>
      <p className="poemText">{poem.text}</p>
    </div>
  );
};

export default PoemScreen;
