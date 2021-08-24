import "./homeScreen.css";

//components
import PoemItem from "../components/PoemItem";

const HomeScreen = ({ poemData }) => {
  console.log("homeScreen ", poemData);
  return (
    <div className="homeScreen">
      <div className="poemContainer">
        {poemData.map((el, i) => (
          <PoemItem
            key={i}
            author={el.author}
            poemTitle={el.title}
            poemText={el.text}
            poemId={el.id}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
