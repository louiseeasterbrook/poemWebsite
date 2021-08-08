import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Screens
import HomeScreen from "./screens/HomeScreen";
import PoemScreen from "./screens/PoemScreen";
import AddScreen from "./screens/AddScreen";

//components
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      {/*navbar*/}
      <NavBar />
      <main>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path="/poem/:id" component={PoemScreen} />
          <Route exact path="/add" component={AddScreen} />
        </Switch>
      </main>
    </Router>
  );
}

export default App;
