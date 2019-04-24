import React from "react";
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import {Redirect} from "react-router-dom";
import Container from "../FrameWorkUnity/Container";
import Search from "../FrameWorkUnity/Search";

class ManagerPage extends React.Component {

    render() {
        console.log('I am in main page props ');
        console.log(this.props);

            return (
                <div>
                    <Navigation/>
                    <Search/>
                    <Container>

                    </Container>
                </div>
            );
        }

}

export default ManagerPage;