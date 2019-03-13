import {Redirect, Route} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";




const SecretRoute = ({ component: Component, ...rest },props) => (

    <Route {...rest} render={(props) => (

        AuthService.isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/',
                state: { from: props.location }
            }} />
    )} />
);


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

const mapStateToProps = (state) => {
    console.log(state);
    return state;
}



export default connect(mapStateToProps)(SecretRoute);