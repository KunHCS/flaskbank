import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import register_test from "./components/register_test";
import OpenAccountPage from "./MainPage/OpenAccountPage";




class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/test" component={OpenAccountPage} />
                </div>
            </Router>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'));



