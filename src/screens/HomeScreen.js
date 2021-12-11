import "./homeScreen.css";
import React, { useEffect } from "react";
import axios from "axios";

//components
import PoemItem from "../components/PoemItem";
import Loading from "../components/Loading";
import Header from "../components/Header";
import Notification from "../components/Notification";

const HomeScreen = ({
  setShowData,
  showData,
  setOpenModal,
  allPoems,
  setAllPoems,
  setDataError,
  dataError,
  isAuthenticated,
}) => {
  //GET DATA FROM SERVER
  useEffect(() => {
    axios
      .get("/api/poems")
      .then((response) => {
        setAllPoems(response.data);
        //stop loading
        setShowData(true);
      })
      .catch((error) => {
        //stop loading
        setShowData(true);
        setDataError("Error loading Poems, please reload the page");
      });
  }, [setAllPoems, setDataError, setShowData]);

  //sort poems in decending order based on no. votes
  let sortedPoems = allPoems.sort((a, b) => {
    return b.votes - a.votes;
  });

  //conditional rendering
  return (
    <>
      <Header setOpenModal={setOpenModal} isAuthenticated={isAuthenticated} />
      <div className="homeScreen">
        <div className="poemContainer">
          {!showData ? (
            <Loading />
          ) : dataError ? (
            <Notification message={dataError} />
          ) : (
            sortedPoems.map((el, i) => (
              <PoemItem key={i} poem={el} profile={false} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
