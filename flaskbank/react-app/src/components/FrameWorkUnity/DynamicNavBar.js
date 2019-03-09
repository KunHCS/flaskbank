import React from 'react';


const dynamicNavBar = (props) =>{
    const navTextStyle = {
        color: 'white',
    };

    return (
        <nav className="Navigation" style={{height:'100', backgroundColor: '#404040',textAlign:'right'}}>
            <a className="Nav-text" style={navTextStyle} href={props.nav.url1}>{props.nav.name1}</a> |
            <a className="Nav-text" style={navTextStyle} href={props.nav.url2}>{props.nav.name2}</a> |
            <a className="Nav-text" style={navTextStyle} href={props.nav.url3}>{props.nav.name3}</a> |
        </nav>
    )
}

export default dynamicNavBar;

