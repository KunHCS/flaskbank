import React from "react";
import Paper from '@material-ui/core/Paper';

const Nav =()=> {
    return (
        <Paper style ={navbarStyle}>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <a className="nav-link" href="/overview">Account Balance</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/pay">Bill Pay</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/transfer">Transfer</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link " href="/deposit">Deposit</a>
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