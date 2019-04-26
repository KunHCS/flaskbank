import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import OpenAccountPage from "./components/OpenAccountPage/OpenAccountPage";
import OverViewPage from "./components/OverViewPage/OverViewPage";
import BillPayPage from "./components/BillPayPage/BillPayPage";
import TransferPage from "./components/TransferPage/TransferMainPage/TransferPage";
import DepositPage from "./components/DepositPage/DepositPage";
import CloseAccountPage from "./components/CloseAccountPage/CloseAccountPage";
import ATMLocationPage from "./components/ATMLocationPage/ATMLocationPage";
import ProfileSettingPage from "./components/ProfileSettingPage/ProfileSettingPage";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";
import CheckingAccountDetail from "./components/OverViewAccountDetailPage/AccountDetails";
import ManagerPage from "./components/ManagerPage/ManagerPage";
import QueryResultPage from "./components/QueryResultPage/QueryResultPage";
import InnerAccountTransfer from "./components/TransferPage/InnerAccountTransfer/InnerAccountTransfer"
import OuterAccountTransfer from "./components/TransferPage/OuterAccountTransfer/OuterAccountTransfer"


import MapV2 from "./components/ATMLocationPage/MapV2";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/atm" component={ATMLocationPage} />
          <Route exact path="/atm2" component={MapV2} />
          <Route exact path="/openAcc" component={OpenAccountPage} />
          <Route exact path="/closeAcc" component={CloseAccountPage} />

          <SecretRoute exact path="/profile" component={ProfileSettingPage} />
          <SecretRoute exact path="/overview" component={OverViewPage} />
          <SecretRoute exact path="/pay" component={BillPayPage} />
          <SecretRoute exact path="/transfer" component={TransferPage} />
          <SecretRoute exact path="/transfer/innerTransfer" component={InnerAccountTransfer} />
          <SecretRoute exact path="/transfer/outerTransfer" component={OuterAccountTransfer} />
          <SecretRoute exact path="/deposit" component={DepositPage} />
          <SecretRoute exact path="/overview/account_detail" component={CheckingAccountDetail}/>

          <SecretRoute exact path="/manager" component={ManagerPage} />
          <SecretRoute exact path="/manager/queryResult" component = {QueryResultPage}/>


        </div>
      </Router>
    );
  }
}

const AuthService = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  logout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const SecretRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      console.log(store.getState().auth),
      store.getState().auth === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    )}
  />
);

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
