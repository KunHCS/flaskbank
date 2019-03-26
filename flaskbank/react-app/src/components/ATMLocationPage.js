import React from 'react';
import Navigation from "./FrameWorkUnity/DynamicNavBar";
import Search from "./FrameWorkUnity/Search";
import Container from "./FrameWorkUnity/Container";
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
                  <p style = {textStyle}>ATM Page</p>
                  <p> <MyMap/> </p>
                </div>
        )
    };
}
const textStyle = {
  fontSize: '30px',
  paddingTop: '10px',
  paddingBottom: '30px',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: 'auto',
  position: 'flex',
  color: 'white',
}

export default ATMLocationPage;
