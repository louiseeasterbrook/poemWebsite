import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

//Screens
import HomeScreen from "./screens/HomeScreen";
import PoemScreen from "./screens/PoemScreen";
import AddScreen from "./screens/AddScreen";
import UpdateScreen from "./screens/UpdateScreen";

//components
import Footer from "./components/Footer";

//components
import NavBar from "./components/NavBar";

function App() {
  const [poems, setPoems] = useState([]);
  const [show, setShow] = useState(false);
  //GET DATA FROM SERVER
  useEffect(() => {
    axios.get("/api/poems").then((response) => {
      setPoems(response.data);
      setShow(true);
    });
  }, []);

  return (
    <Router>
      <Helmet>
        <title>Word Collections</title>
      </Helmet>
      <NavBar />

      <main>
        <Switch>
          <Route exact path="/">
            <HomeScreen poemData={poems} show={show} />
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
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
