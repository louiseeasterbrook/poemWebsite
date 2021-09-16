import "./updateScreen.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

//components
import Notification from "../components/Notification";
import UpdateForm from "../components/UpdateForm";
import Loading from "../components/Loading";

const UpdateScreen = ({ setPoems, poemData }) => {
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  let errorShow = false;
  let history = useHistory();
  let { id } = useParams();
  const [poem, setPoem] = useState([]);

  //GET DATA FROM SERVER
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

  const updatePoem = (updatedPoem) => {
    const hello = {
      id: poem.id,
      title: updatedPoem.title,
      author: updatedPoem.author,
      text: updatedPoem.text,
      votes: poem.votes,
    };

    //UPDATE POEM VOTES
    axios
      .post(`/api/poems/${id}`, updatedPoem)
      .then((response) => {
        //replaces old poem with updated poem in poem array
        let newPoemsList = poemData.map((el) => (el.id === id ? hello : el));

        //updates poems list in app.js
        setPoems(newPoemsList);

        //naviagte back to poem dispaly page
        history.push(`/poem/${poem.id}`);
      })
      .catch((error) => {
        setError("Please fill in all input sections");
      });
  };

  //show the error if the error variable has a value
  if (error) {
    errorShow = true;
  }

  //conditional rendering
  if (!show) {
    return (
      <div className="load-screen">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="addScreen">
        <h2 className="formTitle">Update your Poem</h2>

        <UpdateForm
          setError={setError}
          title={poem.title}
          text={poem.text}
          author={poem.author}
          updatePoem={updatePoem}
        />
        <Notification message={error} show={errorShow} />
      </div>
    );
  }
};

export default UpdateScreen;
