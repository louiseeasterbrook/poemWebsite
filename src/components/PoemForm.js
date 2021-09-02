import React, { useState } from "react";
import "./poemForm.css";

const PoemForm = ({ addPoem }) => {
  const [poem, setPoem] = useState({ title: "", text: "", author: "" });

  const createPoem = (event) => {
    event.preventDefault();
    addPoem(poem);
    // setPoem({ title: "", text: "", author: "" });
  };

  const poemUpdate = (event) => {
    setPoem({ ...poem, [event.target.name]: event.target.value });
  };

  return (
    <div className="poemFormContainer">
      <form onSubmit={createPoem}>
        <label>Title</label>
        <input
          type="text"
          id="poemTitle"
          name="title"
          value={poem.title}
          onChange={poemUpdate}
        />
        <label>Author</label>
        <input
          type="text multi-line"
          id="poemAuthor"
          name="author"
          value={poem.author}
          onChange={poemUpdate}
        />

        <label>Poem Text</label>
        <textarea
          type="text"
          rows="10"
          id="poemText"
          name="text"
          value={poem.text}
          onChange={poemUpdate}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PoemForm;
