import React from 'react';
import Paper from '@material-ui/core/Paper';




const Left = () => {

    const styleLeft = {
        margin: '0px',
        backgroundColor: '#5F5F5F',
        height: 400,
        width: 1000,
    }


    return (
        <div className ="LeftContainer" style={styleLeft} >
            <p> This is left side content</p>
        </div>

    );
}


const Right = () => {

    const paperStyle = {
        height:300,
        width:200
    };

    const styleRight = {
        backgroundColor: '#797979',
        height:400,
        width:1000,
    }


    return (
        <div className ="RightContainer" style={styleRight}>
            <p>This is the right side</p>
            <Paper className ="paper" style={paperStyle}>
                <p> This is paper</p>
            </Paper>
        </div>
    );
}



const Container = () => {

    const containerStyle = {
        backgroundColor: 'yellow',
        height:1400,
        width:2000,
        display: 'inline-block',

    }

    return (
        <div className ="container" style ={containerStyle}>
            <Left/>
            <Right/>
        </div>
    );
}



export default Container;