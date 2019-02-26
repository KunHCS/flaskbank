import React from 'react';
import './Navigation.css';
const navigation = (props) =>{
    return (
        <nav className="Navigation">
            <a className="Nav-text" href="/html/">ATM Location</a> |
            <a className="Nav-text" href="/css/">Open an Account</a> |
            <a className="Nav-text" href="/js/">Close an Account</a> |
        </nav>
    )
}

export default navigation;