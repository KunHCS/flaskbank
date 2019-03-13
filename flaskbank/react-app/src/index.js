import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Redirect,Route} from "react-router-dom";
import Button from '@material-ui/core/Button';
import MainPage from "./components/MainPage";
import OpenAccountPage from "./components/OpenAccountPage";
import OverViewPage from "./components/OverViewPage";
import BillPayPage from "./components/BillPayPage";
import TransferPage from "./components/TransferPage";
import DepositPage from "./components/DepositPage";
import CloseAccountPage from "./components/CloseAccountPage";
import ATMLocationPage from "./components/ATMLocationPage";
import ProfileSettingPage from "./components/PorfileSettingPage";
import { Provider} from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';




class App extends Component  {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/atm" component={ATMLocationPage} />
                    <Route exact path="/openAcc" component={OpenAccountPage} />
                    <Route exact path="/closeAcc" component={CloseAccountPage} />

                    <Route exact path="/profile" component={ProfileSettingPage} />
                    <Route exact path="/overview" component={OverViewPage} />
                    <Route exact path="/pay" component={BillPayPage} />
                    <Route exact path="/transfer" component={TransferPage} />
                    <Route exact path="/deposit" component={DepositPage} />

                </div>
            </Router>
        );
    }
}



const AuthService = {
    isAuthenticated: true, authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100)
    },
    logout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
};


const SecretRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        AuthService.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }} />
    )} />
);


ReactDOM.render(
    <Provider store = {createStore(reducers)}>
        <App />
    </Provider>
    , document.getElementById('root'));





