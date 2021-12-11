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

const FormModal = ({ open, setOpenModal, user, selectedPoem }) => {
  const [error, setError] = useState("");
  let history = useHistory();

  const updatePoem = (updatedPoem) => {
    const config = { headers: { bob: "Bobalooba" } };
    axios
      .post(`/api/poems/${selectedPoem.id}`, updatedPoem, config)
      .then((response) => {
        //navigate to new poem display
        history.push(`/poem/${selectedPoem.id}`);
        //close modal
        setOpenModal(false);
      })
      .catch((error) => {
        setError("Error Updating poem, make sure all inputs are filled");
      });
  };

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
          <h2 className="form-title">Update your Poem</h2>
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
            // addPoem={addPoem}
            setError={setError}
            user={user}
            title={selectedPoem.title}
            text={selectedPoem.text}
            filename={selectedPoem.articleImage}
            update={true}
            axiosFormFunc={updatePoem}
          />
          <Notification message={error} />
        </div>
      </div>,
      document.getElementById("portal")
    );
  }
};

export default FormModal;
