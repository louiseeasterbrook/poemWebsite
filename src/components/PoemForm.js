import React, { useState } from "react";
import "./poemForm.css";

const PoemForm = () => {
  const [poem, setPoem] = useState({ Title: "", Text: "", Author: "" });

  const addPoem = (event) => {
    event.preventDefault();
    console.log("add poem clicked");
    console.log(poem);
  };

  const poemUpdate = (event) => {
    setPoem({ ...poem, [event.target.name]: event.target.value });
  };

  return (
    <div className="poemFormContainer">
      <form onSubmit={addPoem}>
        <label>Title</label>
        <input
          type="text"
          id="poemTitle"
          name="Title"
          value={poem.title}
          onChange={poemUpdate}
        />
        <label>Author</label>
        <input
          type="text multi-line"
          rows="5"
          id="poemAuthor"
          name="Author"
          value={poem.author}
          onChange={poemUpdate}
        />

        <label>Poem Text</label>
        <input
          type="text"
          rows="10"
          id="poemText"
          name="Text"
          value={poem.text}
          onChange={poemUpdate}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PoemForm;
