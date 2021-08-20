import "./addScreen.css";

//components
import PoemForm from "../components/PoemForm";

const AddScreen = () => {
  return (
    <div className="addScreen">
      <h2>Title</h2>
      <p>Enter your peom details</p>
      <PoemForm />
    </div>
  );
};

export default AddScreen;
