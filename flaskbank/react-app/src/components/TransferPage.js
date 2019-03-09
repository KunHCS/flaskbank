import React from 'react';
import Navigation from "./BaseFrameWork/Navigation";
import Search from "./BaseFrameWork/Search";
import Container from "./BaseFrameWork/Container";
import Paper from '@material-ui/core/Paper';
import InnerNavigationBar from "./NavigationDetails"





const TransferDetails= () => {
    return (
        <Paper  style={TransferDetailsStyle}>
            <div style={{margin:'20px'}}>
             Transfer Page
            </div>
        </Paper>
    );
}


const Transfer = () => {
    return (
        <div >
            <Navigation/>
            <Search/>
            <Container>
                <InnerNavigationBar/>
                <TransferDetails/>
            </Container>
        </div>

    );
}


const TransferDetailsStyle = {
    height: "auto",
    width:  500,

    boxShadow: '-2px 5px 25px, 2px 5px 25px',
    margin: '20px'
}

export default Transfer;