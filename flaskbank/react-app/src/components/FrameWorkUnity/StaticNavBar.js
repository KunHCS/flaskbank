import React from "react";
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";

const Nav = (props) => {
    return (
        <Paper style={navbarStyle}>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className={props.active.act1} to="/overview">Account Balance</Link>
                </li>
                <li className="nav-item">
                    <Link className={props.active.act2} to="/pay">Bill Pay</Link>
                </li>
                <li className="nav-item">
                    <Link className={props.active.act3} to="/transfer">Transfer</Link>
                </li>
                <li className="nav-item">
                    <Link className={props.active.act4} to="/deposit">Deposit</Link>
                </li>
            </ul>
        </Paper>
    );
}


//"nav-link active"//

const navbarStyle = {
    height: "auto",
    width: 500,
    boxShadow: '-2px 5px 25px, 2px 5px 25px',
    margin: '20px'

};


export default Nav;