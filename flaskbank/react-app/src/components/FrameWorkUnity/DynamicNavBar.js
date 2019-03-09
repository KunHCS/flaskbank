import React from 'react';


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
            <a className="Nav-text" style={navTextStyle} href={props.nav.url1}>{props.nav.name1}</a> |
            <a className="Nav-text" style={navTextStyle} href={props.nav.url2}>{props.nav.name2}</a> |
            <a className="Nav-text" style={navTextStyle} href={props.nav.url3}>{props.nav.name3}</a> |
        </nav>
    )
}

export default dynamicNavBar;

