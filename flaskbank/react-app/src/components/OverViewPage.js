import React from 'react';
import Navigation from "./FrameWorkUnity/DynamicNavBar";
import Search from "./FrameWorkUnity/Search";
import Container from "./FrameWorkUnity/Container";
import Paper from '@material-ui/core/Paper';
import InnerNavigationBar from "./FrameWorkUnity/StaticNavBar"
import {navInfo1, navInfo2} from "./FrameWorkUnity/NavDetails";

const Statement= () => {
    return (
        <Paper  style={StatementStyle}>
            <div style={{margin:'20px'}}>
             Checking Account -2644
            </div>

            <div style={{margin:'20px'}}>
              Saving Account -9642
            </div>

            <div style={{margin:'20px'}}>
                SJSP Platinum Visa Card -5544
            </div>
        </Paper>
    );
}

const OverViewPage = () => {
    return (
        <div >
            <Navigation nav = {navInfo2}/>
            <Search/>
            <Container>
                <InnerNavigationBar/>
                <Statement/>
            </Container>
        </div>

    );
}


const StatementStyle = {
    height: "auto",
    width:  500,

    boxShadow: '-2px 5px 25px, 2px 5px 25px',
    margin: '20px'
}

export default OverViewPage;