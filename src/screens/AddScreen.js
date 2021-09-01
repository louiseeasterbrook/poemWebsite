import "./addScreen.css";
// import React, { useState } from "react";
import axios from "axios";

//components
import PoemForm from "../components/PoemForm";
import MiniSplash from "../components/MiniSplash";
import userEvent from "@testing-library/user-event";

const AddScreen = ({ setPoems }) => {
  //ADD FUNCTION
  const addPoem = (newPoem) => {
    //setting header token value
    const config = { headers: { bob: "Bobalooba" } };

    axios
      .post("http://localhost:3001/api/poems", newPoem, config)
      .then((response) => {
        setPoems(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="addScreen">
      <MiniSplash />
      <h2>Title</h2>
      <p>Enter your poem details</p>
      <PoemForm addPoem={addPoem} />
    </div>
  );
};

export default AddScreen;
