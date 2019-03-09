import React from 'react';
import Navigation from "./BaseFrameWork/Navigation";
import Search from "./BaseFrameWork/Search";
import Container from "./BaseFrameWork/Container";
import Paper from '@material-ui/core/Paper';
import InnerNavigationBar from "./NavigationDetails"





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
            <Navigation/>
            <Search/>
            <Container>
                <InnerNavigationBar/>
                <CreditCardPayment/>
            </Container>
        </div>

    );
}


const checkingContainerStyle = {
    height: "auto",
    width:  500,

    boxShadow: '-2px 5px 25px, 2px 5px 25px',
    margin: '20px'
}

export default BillPay;