import React from 'react';
import Navigation from "./BaseFrameWork/Navigation";
import Search from "./BaseFrameWork/Search";
import Container from "./BaseFrameWork/Container";
import Paper from '@material-ui/core/Paper';
import InnerNavigationBar from "./NavigationDetails"





const DepositPageDetails = () => {
    return (
        <Paper  style={DepositPageStyle}>
            <div style={{margin:'20px'}}>
             Deposit Page
            </div>
        </Paper>
    );
}


const DepositPage = () => {
    return (
        <div >
            <Navigation/>
            <Search/>
            <Container>
                <InnerNavigationBar/>
                <DepositPageDetails/>
            </Container>
        </div>

    );
}


const DepositPageStyle = {
    height: "auto",
    width:  500,

    boxShadow: '-2px 5px 25px, 2px 5px 25px',
    margin: '20px'
}

export default DepositPage;