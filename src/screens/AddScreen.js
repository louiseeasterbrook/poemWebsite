import "./addScreen.css";
// import React, { useState } from "react";
import axios from "axios";

//components
import PoemForm from "../components/PoemForm";

const AddScreen = () => {
  // const [newPoem, setNewPoem] = useState([]);
  //ADD FUNCTION
  const addPoem = (newPoem) => {
    axios.post("http://localhost:3001/api/poems", newPoem).then((response) => {
      console.log("complete");
      // setUnits(units.concat(response.data));
    });
  };

  return (
    <div className="addScreen">
      <h2>Title</h2>
      <p>Enter your poem details</p>
      <PoemForm addPoem={addPoem} />
    </div>
  );
};

export default AddScreen;
