import "./addScreen.css";
import React, { useState } from "react";
import axios from "axios";

//components
import PoemForm from "../components/PoemForm";
import MiniSplash from "../components/MiniSplash";
import Notification from "../components/Notification";

const AddScreen = ({ setPoems }) => {
  const [error, setError] = useState("");
  let errorShow = false;
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
        setError("Please fill in all input sections");
      });
  };

  if (error) {
    errorShow = true;
  }
  console.log(errorShow);
  return (
    <div className="addScreen">
      {/* <MiniSplash /> */}
      <h2 className="formTitle">Submit your Poem</h2>
      {/* <p>Enter your poem details into the form.</p> */}
      <p>Once you press submit your poem will be displayed on the home page</p>
      <div className="markdownInfo">
        <p>Please format your poem text using Markdown</p>
        <div>?</div>
      </div>

      <PoemForm addPoem={addPoem} />
      <Notification message={error} show={errorShow} />
    </div>
  );
};

export default AddScreen;
