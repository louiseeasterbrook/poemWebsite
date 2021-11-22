import "./resultScreen.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFrown } from "@fortawesome/free-regular-svg-icons";

//components
import PoemItem from "../components/PoemItem";

const ResultScreen = ({
  poemData,
  searchVal,
  searchPress,
  setSearchPress,
  setSearchVal,
}) => {
  const [noResults, setNoResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [previewSearchVal, setPreviewSearchVal] = useState("");
  const [finalResults, setFinalResults] = useState([]);

  //sort poems in decending order based on no. votes
  let sortedPoems = poemData.sort((a, b) => {
    return b.votes - a.votes;
  });

  useEffect(() => {
    if (searchPress) {
      filterData();
    }
  }, [searchPress]);

  const filterData = () => {
    setSearchResults([]);
    setFinalResults([]);
    setNoResults(false);
    setPreviewSearchVal(searchVal);

    poemData.forEach((element) => {
      let lowerCaseName = element.title.toLowerCase();

      if (lowerCaseName.includes(searchVal.toLowerCase())) {
        searchResults.push(element);
      }
    });

    //check for no results
    if (searchResults.length === 0) {
      setNoResults(true);
    }
    setSearchVal("");
    setSearchPress(false);
    setFinalResults(searchResults);
  };

  //conditional rendering - check for no results
  if (noResults) {
    return (
      <div className="homeScreen">
        <p className="result-message no-results">
          <FontAwesomeIcon icon={faFrown} className=".icon-sad" />
          No results for{" "}
          <strong>
            <i>{previewSearchVal}</i>
          </strong>
        </p>
      </div>
    );
  } else {
    return (
      <div className="homeScreen">
        <div>
          <p className="result-message">
            Search results for{" "}
            <strong>
              <i>{previewSearchVal}</i>
            </strong>
            :
          </p>
        </div>
        <div className="poemContainer">
          {finalResults.map((el, i) => (
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

export default ResultScreen;
