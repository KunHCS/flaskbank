import React from 'react';
import Navigation from "./FrameWorkUnity/DynamicNavBar";
import Search from "./FrameWorkUnity/Search";
import Container from "./FrameWorkUnity/Container";
import Paper from '@material-ui/core/Paper';
import InnerNavigationBar from "./FrameWorkUnity/StaticNavBar"
import {navInfo2} from "./FrameWorkUnity/NavDetails";

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
            <Navigation nav = {navInfo2}/>
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