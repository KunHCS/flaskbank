import React from "react";
import Paper from '@material-ui/core/Paper';

const Nav =()=> {
    return (
        <Paper style ={navbarStyle}>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <a className="nav-link" href="#">Account Balance</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Bill Pay</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">Transfer</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link " href="#">Deposit</a>
                </li>
            </ul>
        </Paper>
    );
}



const navbarStyle = {
    height: "auto",
    width:  500,
    boxShadow: '-2px 5px 25px, 2px 5px 25px',
    margin: '20px'

};

export default Nav;