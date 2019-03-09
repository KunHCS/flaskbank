import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainPage from "./components/MainPage";
import OpenAccountPage from "./components/OpenAccountPage";
import OverViewPage from "./components/OverViewPage";




class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/overview" component={OverViewPage} />
                    <Route exact path="/test" component={OpenAccountPage} />
                </div>
            </Router>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('root'));



