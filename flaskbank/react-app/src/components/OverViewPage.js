import React from 'react';
import Navigation from "./FrameWorkUnity/DynamicNavBar";
import Search from "./FrameWorkUnity/Search";
import Container from "./FrameWorkUnity/Container";
import Paper from '@material-ui/core/Paper';
import InnerNavigationBar from "./FrameWorkUnity/StaticNavBar"
import {navInfo2} from "./FrameWorkUnity/NavDetails";

const Statement= () => {
    return (
        <Paper  style={StatementStyle}>
            <div style={innerRowStyle}>
             Checking Account -2644
            </div>

            <div style={innerRowStyle}>
              Saving Account -9642
            </div>

            <div style={innerRowStyle}>
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
                <InnerNavigationBar active ={activeElement}/>
                <div>
                    Personal Account
                </div>
                <Statement/>
            </Container>
        </div>

    );
}

const activeElement = {
    act1: "nav-link active",
    act2: "nav-link ",
    act3: "nav-link ",
    act4: "nav-link ",
}

const StatementStyle = {
    height: 350,
    width:  600,
    boxShadow: '-2px 5px 25px, 2px 5px 25px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',

}

const innerRowStyle= {
    backgroundColor: '#797979',
    height: 50,
    width:  400,
    margin: '20px',
    display: 'flex',
    textAlign: 'center',
    justifyContent:'center',
    alignItems: 'center',
}

export default OverViewPage;