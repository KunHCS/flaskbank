import React from "react";
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import {Redirect} from "react-router-dom";
import Container from "../FrameWorkUnity/Container";
import Search from "../FrameWorkUnity/Search";
import axios from "axios";
import {connect} from "react-redux";
import { getProfile } from "../../actions/GetProfileAction/getProfileAction";


class ManagerPage extends React.Component {

    componentDidMount() {
        console.log(" ManagerPage Component Did Mount")
        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}

        axios.get("/api/client/all",{headers: req_headers})
            .then(response => {
                console.log(response);
                this.props.getProfile(response.data);
            }).catch (error => console.log(error.response.data.msg));
    }

    render() {
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


class DashBoard extends React.Component {

    componentDidMount() {

    }

    render() {
        console.log(this.props);
        return (
            <div>
                I am DASHBOARD
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state;
}

export default connect(mapStateToProps,{ getProfile})(ManagerPage);
