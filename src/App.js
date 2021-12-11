import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from "react";

//Screens
import HomeScreen from "./screens/HomeScreen";
import PoemScreen from "./screens/PoemScreen";
import ProfileScreen from "./screens/ProfileScreen";

//components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

//Modals
import FormModal from "./components/FormModal";
import DeleteModal from "./components/DeleteModal";
import UpdateModal from "./components/UpdateModal";

//auth0 imports
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  //stores the list of poemss
  const [poems, setPoems] = useState([]);
  // indicates if data has been fetched from the database
  const [showData, setShowData] = useState(false);
  //loading data error
  const [dataError, setDataError] = useState("");

  //controls open and close of PoemForm modal
  const [openModal, setOpenModal] = useState(false);
  //controls open and close of Delete modal
  const [openDelModal, setOpenDelModal] = useState(false);
  //controls open and close of Edit modal
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedPoem, setSelectedPoem] = useState({});

  //data for user profile
  const [profilePoems, setProfilePoems] = useState([]);

  //for login authentication
  const { user, isAuthenticated } = useAuth0();

  return (
    <Router>
      <NavBar
        isAuthenticated={isAuthenticated}
        user={user}
        setOpenModal={setOpenModal}
      />

      <main>
        <ScrollToTop />
        <Switch>
          <Route exact path="/">
            <HomeScreen
              allPoems={poems}
              setAllPoems={setPoems}
              showData={showData}
              setShowData={setShowData}
              dataError={dataError}
              setDataError={setDataError}
              setOpenModal={setOpenModal}
              isAuthenticated={isAuthenticated}
            />
          </Route>
          <Route exact path="/poem/:id">
            <PoemScreen setPoems={setPoems} poems={poems} />
          </Route>
          <Route exact path="/profile">
            <ProfileScreen
              user={user}
              isAuthenticated={isAuthenticated}
              setSelectedPoem={setSelectedPoem}
              setOpenDelModal={setOpenDelModal}
              setOpenEditModal={setOpenEditModal}
              profilePoems={profilePoems}
              setProfilePoems={setProfilePoems}
            />
          </Route>
        </Switch>
      </main>
      <FormModal
        open={openModal}
        setOpenModal={setOpenModal}
        setPoems={setPoems}
        poemData={poems}
        user={user}
        allPoems={poems}
        setAllPoems={setPoems}
      />

      <DeleteModal
        open={openDelModal}
        setOpenModal={setOpenDelModal}
        selectedPoem={selectedPoem}
        profilePoems={profilePoems}
        setProfilePoems={setProfilePoems}
      />
      <UpdateModal
        open={openEditModal}
        setOpenModal={setOpenEditModal}
        user={user}
        selectedPoem={selectedPoem}
      />
      <Footer />
    </Router>
  );
}

export default App;
