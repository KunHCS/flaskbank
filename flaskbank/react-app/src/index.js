import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Redirect,Route} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import OpenAccountPage from "./components/OpenAccountPage/OpenAccountPage";
import OverViewPage from "./components/OverViewPage/OverViewPage";
import BillPayPage from "./components/BillPayPage/BillPayPage";
import TransferPage from "./components/TransferPage/TransferPage";
import DepositPage from "./components/DepositPage/DepositPage";
import CloseAccountPage from "./components/CloseAccountPage/CloseAccountPage";
import ATMLocationPage from "./components/ATMLocationPage/ATMLocationPage";
import ProfileSettingPage from "./components/ProfileSettingPage/ProfileSettingPage";
import CheckingAccountDetail from "./components/CheckingAccountDetailPage/CheckingAccountDetail";
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
                    {/*<Route path="/deposit/check" component={CheckingAccountDetail} />*/}

                    <SecretRoute exact path="/profile" component={ProfileSettingPage} />
                    <SecretRoute exact path="/overview" component={OverViewPage} />
                    <SecretRoute exact path="/pay" component={BillPayPage} />
                    <SecretRoute exact path="/transfer" component={TransferPage} />
                    <SecretRoute exact path="/deposit" component={DepositPage} />


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
        console.log(store.getState().auth),
            store.getState().auth === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }} />
    )} />
);



const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));





