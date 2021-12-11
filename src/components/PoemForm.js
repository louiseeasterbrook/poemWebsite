import "./poemForm.css";
import React, { useState, useEffect } from "react";

const PoemForm = ({
  setError,
  user,
  title,
  text,
  filename,
  update,
  axiosFormFunc,
}) => {
  const [poem, setPoem] = useState({
    title: title,
    text: text,
    author: user.name,
    fileName: filename,
  });

  useEffect(() => {
    //onload set error to nothing
    setError("");
  }, [setError]);

  //function triggered by form submit
  const createPoem = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = new FormData();

    if (update) {
      formData.append("id", poem.id);
    }
    formData.append("title", poem.title);
    formData.append("author", poem.author);
    formData.append("text", poem.text);
    formData.append("articleImage", poem.fileName);
    formData.append("posted", new Date());
    formData.append("userId", user.sub);

    //send poem back to modal to up updated or posted
    axiosFormFunc(formData);
    // //remove error message
    setError("");
  };

  const poemUpdate = (event) => {
    setPoem({ ...poem, [event.target.name]: event.target.value });
  };

  const onChangeFile = (e) => {
    setPoem({ ...poem, fileName: e.target.files[0] });
  };

  return (
    <div className="poemFormContainer">
      <form onSubmit={createPoem} encType="multipart/form-data">
        <label>Author</label>
        <input
          type="text multi-line"
          id="poemAuthor"
          name="author"
          value={poem.author}
          className="text-input"
          readOnly={true}
        />
        <label>Title</label>
        <input
          type="text"
          id="poemTitle"
          name="title"
          value={poem.title}
          onChange={poemUpdate}
          className="text-input"
        />

        <label>Poem Text</label>
        <textarea
          type="text"
          rows="5"
          id="poemText"
          name="text"
          value={poem.text}
          onChange={poemUpdate}
          className="text-input"
        />

        {update ? (
          <></>
        ) : (
          <>
            <label>Choose a Display Image</label>
            <input
              type="file"
              filename="articleImage"
              onChange={onChangeFile}
              className="img-btn"
            />
          </>
        )}

        <button className="submit-button" type="submit">
          {update ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PoemForm;
