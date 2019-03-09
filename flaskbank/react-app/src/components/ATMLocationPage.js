import React from 'react';
import Navigation from "./FrameWorkUnity/DynamicNavBar";
import Search from "./FrameWorkUnity/Search";
import Container from "./FrameWorkUnity/Container";
import Paper from '@material-ui/core/Paper';
import {navInfo1} from "./FrameWorkUnity/NavDetails";
import MyMap from "./FrameWorkUnity/GoogleMap"



const ATMLocationPage = () => {
    return (
        <div >
            <Navigation nav = {navInfo1}/>
            <Search/>
            <Container>
                <ATMDetails />
            </Container>
        </div>

    );
}


class ATMDetails extends React.Component {

    render(){
        return (
                <div>
                    ATM Page
                    <MyMap/>
                </div>
        )
    };
}



export default ATMLocationPage;
