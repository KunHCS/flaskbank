import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import register_test from "./components/register_test";
import MainPage from "./MainPage/MainPage";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/test" component={register_test} />
        </div>
      </Router>
    );
  }
}

export default App;
