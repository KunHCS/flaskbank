import React from 'react';
import Paper from '@material-ui/core/Paper';
import Pic from '../images/testImage.png'




const Left = () => {
    const styleLeft = {
        backgroundColor: '#5F5F5F',
        height:'auto',
        width: '30%',
        textAlign: '-webkit-center'
    }

    return (
        <div className ="LeftContainer" style={styleLeft} >
            <p> This is left side content</p>
            <img src={Pic} alt="mypic" style={{witdh:'15%' ,height:'15%'}}/>
        </div>

    );
}


const Right = () => {
    const paperStyle = {
        height:'45%',
        width:  '25%'
    };
    const styleRight = {
        backgroundColor: '#797979',
        height:'auto',
        width: '70%',
        textAlign: '-webkit-center'
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
        height:'100%',
        width:'100%',
        display: 'flex',
        position: 'absolute',
        minWidth: '100%'
    }

    return (
        <div className ="container" style ={containerStyle}>
            <Left/>
            <Right/>

        </div>
    );
}



export default Container;