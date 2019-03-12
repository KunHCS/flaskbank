import React from 'react';
import Navigation from "./FrameWorkUnity/DynamicNavBar";
import Search from "./FrameWorkUnity/Search";
import Container from "./FrameWorkUnity/Container";
import Paper from '@material-ui/core/Paper';
import InnerNavigationBar from "./FrameWorkUnity/StaticNavBar"
import {navInfo2} from "./FrameWorkUnity/NavDetails";


const CreditCardPayment= () => {
    return (
        <Paper  style={checkingContainerStyle}>
            <div style={{margin:'20px'}}>
                SJSP Credit Card
            </div>
        </Paper>
    );
}


const BillPay = () => {
    return (
        <div >
            <Navigation nav = {navInfo2}/>
            <Search/>
            <Container>
                <InnerNavigationBar active={activeElement}/>
                <CreditCardPayment/>
            </Container>
        </div>

    );
}

const activeElement = {
    act1: "nav-link ",
    act2: "nav-link active",
    act3: "nav-link ",
    act4: "nav-link ",
}

const checkingContainerStyle = {
    height: "auto",
    width:  500,

    boxShadow: '-2px 5px 25px, 2px 5px 25px',
    margin: '20px'
}

export default BillPay;