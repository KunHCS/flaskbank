import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainPage from "./components/MainPage";
import register_test from "./components/register_test";
import OpenAccountPage from "./components/OpenAccountPage";
import OverView from "./components/OverView";




class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/userBalance" component={OverView} />
                    <Route exact path="/test" component={OpenAccountPage} />
                </div>
            </Router>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'));



