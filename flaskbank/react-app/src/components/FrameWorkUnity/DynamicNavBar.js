import React from 'react';
import {Link} from "react-router-dom";

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


    return (
        <nav className="Navigation" style={navBarStyle}>
            <a className="Nav-text" style={navTextStyle} href={props.nav.url0}>{props.nav.name0}</a> |
            <Link className="Nav-text" style={navTextStyle} to={props.nav.url1}>{props.nav.name1}</Link> |
            <Link className="Nav-text" style={navTextStyle} to={props.nav.url2}>{props.nav.name2}</Link> |
            <Link className="Nav-text" style={navTextStyle} to={props.nav.url3}>{props.nav.name3}</Link> |
        </nav>
    )
}


export default dynamicNavBar;

