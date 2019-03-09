import React from 'react';
import Navigation from "./BaseFrameWork/Navigation";
import Search from "./BaseFrameWork/Search";
import Container from "./BaseFrameWork/Container";
import Paper from '@material-ui/core/Paper';
import Nav from "./NavigationDetails"





const Checking= () => {
    return (
        <Paper  style={checkingContainerStyle}>
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
            <Navigation/>
            <Search/>
            <Container>
                <Nav/>
                <Checking/>
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

export default OverViewPage;