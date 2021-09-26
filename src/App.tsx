import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import GamePage from './pages/GamePage'
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import HighScoresPage from "./pages/HighScoresPage";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/game" component={GamePage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/high-scores" component={HighScoresPage} />
      </Switch>
    </Router>
  );
};
export default Routes;
