import "./homeScreen.css";
import image from "../img/feather.png";
import { useHistory } from "react-router-dom";
//components
import PoemItem from "../components/PoemItem";
import Loading from "../components/Loading";

const HomeScreen = ({ poemData, showData }) => {
  let history = useHistory();
  //sort poems in decending order based on no. votes
  let sortedPoems = poemData.sort((a, b) => {
    return b.votes - a.votes;
  });

  //conditional rendering
  if (!showData) {
    return (
      <div className="load-screen">
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="homeScreen">
        <div className="open-header">
          <div className="open-blurb">
            <h2>Express yourself with words</h2>
            <p>Browse and submit your own poems</p>
            <button onClick={() => history.push("/add")}>
              Submit your first Poem
            </button>
          </div>
          <div className="img-holder">
            <img
              src={image}
              alt="girl on computer - clipart"
              className="open-img"
            />
          </div>
        </div>
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
    );
  }
};

export default HomeScreen;
