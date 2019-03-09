import React from 'react';


const navigation = (props) =>{
    const navTextStyle = {
        color: 'white',
    };

    return (
        <nav className="Navigation" style={{height:'100', backgroundColor: '#404040',textAlign:'right'}}>
            <a className="Nav-text" style={navTextStyle} href="">{props.name1}</a> |
            <a className="Nav-text" style={navTextStyle} href="/test">{props.name2}</a> |
            <a className="Nav-text" style={navTextStyle} href="">{props.name3}</a> |
        </nav>
    )
}

export default navigation;

