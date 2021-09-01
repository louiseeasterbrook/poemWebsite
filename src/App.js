import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

//Screens
import HomeScreen from "./screens/HomeScreen";
import PoemScreen from "./screens/PoemScreen";
import AddScreen from "./screens/AddScreen";

//components
import NavBar from "./components/NavBar";

function App() {
  const [poems, setPoems] = useState([]);

  //GET DATA FROM SERVER
  useEffect(() => {
    axios.get("http://localhost:3001/api/poems").then((response) => {
      setPoems(response.data.poems);
    });
  }, []);

  return (
    <Router>
      <NavBar />
      <main>
        <Switch>
          <Route exact path="/">
            <HomeScreen poemData={poems} />
          </Route>
          <Route exact path="/poem/:id">
            <PoemScreen setPoems={setPoems} poems={poems} />
          </Route>
          <Route exact path="/add">
            <AddScreen setPoems={setPoems} poemData={poems} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
