import React from 'react';


const navigation = (props) =>{
    const navTextStyle = {
        color: 'white',
    };

    return (
        <nav className="Navigation" style={{height:'100', backgroundColor: '#404040',textAlign:'right'}}>
            <a className="Nav-text" style={navTextStyle} href="">ATM Location</a> |
            <a className="Nav-text" style={navTextStyle} href="">Open an Account</a> |
            <a className="Nav-text" style={navTextStyle} href="">Close an Account</a> |
        </nav>
    )
}

export default navigation;



// .Navigation {
//     height:100%,background-color: #404040, text-align: right;
//
// }
// .Nav-text{
//     color: white;
//     alignment: center;
// }