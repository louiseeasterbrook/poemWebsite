import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

//Screens
import HomeScreen from "./screens/HomeScreen";
import PoemScreen from "./screens/PoemScreen";
import AddScreen from "./screens/AddScreen";
import UpdateScreen from "./screens/UpdateScreen";
import ResultScreen from "./screens/ResultScreen";

//components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  //stores the list of poemss
  const [poems, setPoems] = useState([]);
  // indicates if data has been fetched from the database
  const [showData, setShowData] = useState(false);
  //stores the searched input value
  const [searchVal, setSearchVal] = useState("");
  //if true this variable triggers the search function - used by ResultScreen and NavBar
  const [searchPress, setSearchPress] = useState(false);

  //GET DATA FROM SERVER
  useEffect(() => {
    axios.get("/api/poems").then((response) => {
      setPoems(response.data);
      setShowData(true);
    });
  }, []);

  return (
    <Router>
      <NavBar
        setSearchVal={setSearchVal}
        searchVal={searchVal}
        setSearchPress={setSearchPress}
      />

      <main>
        <Switch>
          <Route exact path="/">
            <HomeScreen poemData={poems} showData={showData} />
          </Route>
          <Route exact path="/poem/:id">
            <PoemScreen setPoems={setPoems} poems={poems} />
          </Route>
          <Route exact path="/add">
            <AddScreen setPoems={setPoems} poemData={poems} />
          </Route>
          <Route exact path="/update/:id">
            <UpdateScreen setPoems={setPoems} poemData={poems} />
          </Route>
          <Route exact path="/searchresults">
            <ResultScreen
              poemData={poems}
              searchVal={searchVal}
              setSearchVal={setSearchVal}
              searchPress={searchPress}
              setSearchPress={setSearchPress}
            />
          </Route>
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
