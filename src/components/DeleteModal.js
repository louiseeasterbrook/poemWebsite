import "./formModal.css";
import React, { useState } from "react";
import axios from "axios";
import ReactDom from "react-dom";

//component
import Notification from "./Notification";

//font awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const DeleteModal = ({
  open,
  setOpenModal,
  selectedPoem,
  profilePoems,
  setProfilePoems,
}) => {
  const [error, setError] = useState("");

  const deletePoem = () => {
    setError("");
    axios
      .delete(`/api/poems/${selectedPoem.id}`)
      .then((response) => {
        //removes poem from poem array
        let newProfilePoems = profilePoems.filter(
          (el) => el.id !== selectedPoem.id
        );
        //updates poems list in app.js
        setProfilePoems(newProfilePoems);
        //close Modal
        setOpenModal(false);
      })
      .catch((error) => {
        setError("Error deleting poem");
      });
  };

  if (!open) {
    return null;
  } else {
    return ReactDom.createPortal(
      <div className="modal-bg">
        <div className="modal-container del-container">
          <FontAwesomeIcon
            icon={faTimes}
            className="cross-icon"
            onClick={() => setOpenModal(false)}
          />
          <h4>Would you like to delete '{selectedPoem.title}' ?</h4>
          <div className="delete-btns">
            <button onClick={deletePoem}>Yes</button>
            <button onClick={() => setOpenModal(false)}>No</button>
          </div>
          {error ? <Notification message={error} /> : <></>}
        </div>
      </div>,
      document.getElementById("portal")
    );
  }
};

export default DeleteModal;
