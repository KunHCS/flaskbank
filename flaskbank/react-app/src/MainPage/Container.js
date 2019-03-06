import React from 'react';
import Pic from '../images/testImage.png';
import RegisterForm from '../components/register_test';
import Login from './login';
import BGimg from '../images/bg.jpeg';



const Left = () => {
    const styleLeft = {
        backgroundColor: '#5F5F5F',
        height:'auto',
        width: '30%',
        textAlign: '-webkit-center',
        opacity: '0.98'
    }

    return (
        <div className ="LeftContainer" style={styleLeft} >
            <p> This is left side content</p>
            <img src={Pic} alt="mypic" style={{witdh:'15%' ,height:'15%'}}/>
        </div>

    );
}


const Right = (prop) => {

    const styleRight = {
        backgroundColor: '#797979',
        height:'auto',
        width: '70%',
        textAlign: '-webkit-center',
        opacity: '0.98'
    }

    return (
        <div className ="RightContainer" style={styleRight}>
            <p>This is the right side</p>
            {/*<RegisterForm/>*/}
            <Login/>
        </div>
    );
}


// url('../images/bg.jpeg')
const Container = () => {

    const containerStyle = {
        backgroundImage: "url(" + BGimg + ")",
        backgroundSize: 'cover',
        backgroundRepeat:'no-repeat',
        backgroundPosition:'center',
        height:'100%',
        width:'100%',
        display: 'flex',
        position: 'absolute',
        minWidth: '100%',


    }

    return (
        <div className ="container" style ={containerStyle}>
            <Left/>
            <Right/>
        </div>
    );
}



export default Container;