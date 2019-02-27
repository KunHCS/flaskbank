import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import register_test from "./components/register_test";

class App extends Component {
  render() {
    return (
      <Router>
        {/* <Route exact path="/" component={Mainpage} /> */}
        <Route exact path="/test" component={register_test} />
      </Router>
    );
  }
}

export default App;
