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
            Profile Setting Page
        </Paper>
    );
}

const ProfileSettingPage = () => {
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

export default ProfileSettingPage;