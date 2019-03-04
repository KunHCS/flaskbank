import React from 'react';
import './Navigation.css';
const navigation = (props) =>{
    return (
        <nav className="Navigation">
            <a className="Nav-text" href="">ATM Location</a> |
            <a className="Nav-text" href="">Open an Account</a> |
            <a className="Nav-text" href="">Close an Account</a> |
        </nav>
    )
}

export default navigation;