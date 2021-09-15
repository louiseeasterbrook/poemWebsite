import "./addScreen.css";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

//components
import PoemForm from "../components/PoemForm";
import Notification from "../components/Notification";

const AddScreen = ({ setPoems, poemData }) => {
  const [error, setError] = useState("");
  let errorShow = false;
  let history = useHistory();

  //ADD FUNCTION

  const addPoem = (newPoem) => {
    //setting header token value
    const config = { headers: { bob: "Bobalooba" } };

    axios
      .post("/api/poems", newPoem, config)
      .then((response) => {
        let newPoems = poemData;
        //add new poem to current poem
        newPoems.push(response.data);
        setPoems(newPoems);

        //navigate to new poem display
        history.push(`/poem/${response.data.id}`);
      })
      .catch((error) => {
        setError("Please fill in all input sections");
      });
  };

  //show the error if the error variable has a value
  if (error) {
    errorShow = true;
  }

  return (
    <div className="addScreen">
      <h2 className="formTitle">Submit your Poem</h2>

      <p className="instructions">
        Once you press submit your poem will be displayed on the home page
      </p>
      <div className="markdownInfo">
        <p className="instructions">
          Please format your poem text using Markdown
        </p>
        <div>?</div>
      </div>

      <PoemForm addPoem={addPoem} setError={setError} />
      <Notification message={error} show={errorShow} />
    </div>
  );
};

export default AddScreen;
