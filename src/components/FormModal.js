import "./formModal.css";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ReactDom from "react-dom";

//components
import PoemForm from "../components/PoemForm";
import Notification from "../components/Notification";

//font awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const FormModal = ({ setAllPoems, allPoems, open, setOpenModal, user }) => {
  const [error, setError] = useState("");

  let history = useHistory();

  //poem post function (triggered on form submit)
  const addPoem = (newPoem) => {
    //set header
    const config = { headers: { bob: "Bobalooba" } };
    axios
      .post("/api/poems", newPoem, config)
      .then((response) => {
        let newPoems = allPoems;

        //add new poem to current poem
        newPoems.push(response.data);
        setAllPoems(newPoems);

        //navigate to new poem display
        history.push(`/poem/${response.data.id}`);
      })
      .catch((error) => {
        setError("Please fill in all inputs");
      });
  };

  //show the error if the error variable has a value

  if (!open) {
    return null;
  } else {
    return ReactDom.createPortal(
      <div className="modal-bg">
        <div className="modal-container">
          <FontAwesomeIcon
            icon={faTimes}
            className="cross-icon"
            onClick={() => setOpenModal(false)}
          />
          <h2 className="form-title">Submit your Poem</h2>
          <p className="form-instructions">
            Please use{" "}
            <a
              href="https://www.markdownguide.org/basic-syntax/"
              target="_blank"
              rel="noreferrer"
            >
              Markdown
            </a>{" "}
            to format your poem
          </p>
          <PoemForm
            addPoem={addPoem}
            setError={setError}
            user={user}
            axiosFormFunc={addPoem}
          />
          <Notification message={error} />
        </div>
      </div>,
      document.getElementById("portal")
    );
  }
};

export default FormModal;
