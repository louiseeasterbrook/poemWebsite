import "./homeScreen.css";
import TopSplash from "../components/TopSplash";

//components
import PoemItem from "../components/PoemItem";
import Loading from "../components/Loading";

const HomeScreen = ({ poemData, show }) => {
  //sort poems in decending order based on no. votes
  let sortedPoems = poemData.sort((a, b) => {
    return b.votes - a.votes;
  });

  //conditional rendering
  if (!show) {
    return (
      <div className="load-screen">
        <Loading />
      </div>
    );
  } else {
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
  }
};

export default HomeScreen;
