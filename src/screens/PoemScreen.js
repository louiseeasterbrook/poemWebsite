import "./poemScreen.css";
import userPic from "../user.png";

const PoemScreen = () => {
  return (
    <div className="poemScreen">
      <h2 className="poemTitle">Title</h2>
      <div className="authorDisplay">
        <img src={userPic} alt="author" className="authorImg" />
        <p className="authorName">Louise Easterbrok</p>
      </div>
      <p className="poemText">
        Lorem Ipsum is simply dummy text of the <br />
        printing and typesetting industry. Lorem Ipsum has been the industry's
        <br />
        standard dummy text ever since the 1500s,
        <br /> when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. <br />
        It has survived not only five centuries, but also the leap into
        electronic
        <br />
        typesetting, remaining essentially unchanged. <br />
        It was popularised in the 1960s with the release of Letraset <br />
        sheets containing Lorem Ipsum <br />
        passages, and more recently with desktop publishing <br />
        software like Aldus PageMaker including versions of Lorem Ipsum
      </p>
    </div>
  );
};

export default PoemScreen;
