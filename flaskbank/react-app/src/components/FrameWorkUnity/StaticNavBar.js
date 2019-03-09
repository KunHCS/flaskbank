import React from "react";
import Paper from '@material-ui/core/Paper';

const Nav =(props)=> {
    return (
        <Paper style ={navbarStyle}>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <a className={props.active.act1} href="/overview">Account Balance</a>
                </li>
                <li className="nav-item">
                    <a className={props.active.act2} href="/pay">Bill Pay</a>
                </li>
                <li className="nav-item">
                    <a className={props.active.act3} href="/transfer">Transfer</a>
                </li>
                <li className="nav-item">
                    <a className={props.active.act4} href="/deposit">Deposit</a>
                </li>
            </ul>
        </Paper>
    );
}


//"nav-link active"//

const navbarStyle = {
    height: "auto",
    width:  500,
    boxShadow: '-2px 5px 25px, 2px 5px 25px',
    margin: '20px'

};

export default Nav;