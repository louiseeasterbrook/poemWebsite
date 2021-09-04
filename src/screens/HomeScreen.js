import "./homeScreen.css";
import TopSplash from "../components/TopSplash";

//components
import PoemItem from "../components/PoemItem";

const HomeScreen = ({ poemData }) => {
  //sort poems in decending order based on no. votes
  let sortedPoems = poemData.sort((a, b) => {
    return b.votes - a.votes;
  });

  return (
    <div className="homeScreen">
      <TopSplash />
      <div className="mainSection">
        <div className="poemContainer">
          {sortedPoems.map((el, i) => (
            <PoemItem
              key={i}
              author={el.author}
              poemTitle={el.title}
              poemText={el.text}
              poemId={el.id}
              votes={el.votes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
