import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logOutAction,logOutRequest} from "../../actions/LoginAction/LoginAction";

const dynamicNavBar = (props) =>{
    const navTextStyle = {
        color: 'white',
    };

    const navBarStyle = {
        height:'100',
        backgroundColor: '#404040',
        textAlign:'right',
        margin: "auto",
        letterSpacing: '1px',
        wordSpacing:'4px'
    };

    if (props.auth==false) {
        return (

            <nav className="Navigation" style={navBarStyle}>
                <a className="Nav-text" style={navTextStyle} href="/atm">ATM Location</a> |
                <Link className="Nav-text" style={navTextStyle} to="/">Main Page</Link> |
                <Link className="Nav-text" style={navTextStyle} to="/openAcc">Open an Account</Link> |
                <Link className="Nav-text" style={navTextStyle} to="/closeAcc">Close an Account</Link> |
            </nav>
        )
    }
    else if (props.auth==true) {
        return (
        <nav className="Navigation"style={navBarStyle}>
        <Link className="Nav-text" style={navTextStyle} to="/overview">{props.myInfo.first_name}</Link> |
        <Link className="Nav-text" style={navTextStyle} to="/profile">Profile Setting</Link> |
        <Link className="Nav-text" style={navTextStyle} to="/"
              onClick={ ()=> {props.logOutRequest(); props.logOutAction();}}   >Sign Out</Link> |
        </nav>
    ) }
}

const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state;
}



export default connect(mapStateToProps,{logOutAction,logOutRequest})(dynamicNavBar);

