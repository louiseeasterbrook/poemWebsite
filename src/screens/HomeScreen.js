import "./homeScreen.css";

//components
import PoemItem from "../components/PoemItem";

const HomeScreen = () => {
  return (
    <div className="homeScreen">
      <div className="poemContainer">
        <PoemItem />
        <PoemItem />
        <PoemItem />
        <PoemItem />
        <PoemItem />
        <PoemItem />
      </div>
    </div>
  );
};

export default HomeScreen;
