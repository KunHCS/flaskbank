import React from "react";
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";

//import MyMap from "../FrameWorkUnity/GoogleMap";

import { MapV2 as MyMap } from "./MapV2";


const ATMLocationPage = () => {
  return (
    <div>
      <Navigation />
      <Search />
      <Container>
        <ATMDetails />
      </Container>
    </div>
  );
};

class ATMDetails extends React.Component {
  render() {
    return (
      <div>
        <p style={textStyle}>ATM Page</p>
        <p>
          {" "}
          <MyMap />{" "}
        </p>
      </div>
    );
  }
}
const textStyle = {
  fontSize: "30px",
  paddingTop: "10px",
  paddingBottom: "30px",
  fontWeight: "bold",
  textAlign: "center",
  margin: "auto",
  position: "flex",
  color: "white"
};

export default ATMLocationPage;
