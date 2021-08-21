import "./homeScreen.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
//components
import PoemItem from "../components/PoemItem";

const HomeScreen = () => {
  const [poems, setPoems] = useState([]);

  //GET DATA FROM SERVER
  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/api/poems").then((response) => {
      console.log("promise fulfilled");
      console.log(response.data.poems);
      setPoems(response.data.poems);
      console.log("POEMS", poems);
    });
  }, []);
  return (
    <div className="homeScreen">
      <div className="poemContainer">
        {poems.map((el, i) => (
          <PoemItem
            key={i}
            author={el.author}
            poemTitle={el.title}
            poemText={el.text}
            poemId={el.id}
          />
        ))}
        {/* <PoemItem />
        <PoemItem />
        <PoemItem />
        <PoemItem />
        <PoemItem />
        <PoemItem /> */}
      </div>
    </div>
  );
};

export default HomeScreen;
