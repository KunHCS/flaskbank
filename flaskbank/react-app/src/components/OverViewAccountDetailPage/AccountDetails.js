import React from 'react';
import PropTypes from "prop-types";
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import InnerNavigationBar from "../FrameWorkUnity/StaticNavBar"
import {connect} from "react-redux";
import axios from "axios";
import Paper from '@material-ui/core/Paper';




class AccountDetails extends React.Component{



    render() {
        console.log("I am in AccountDetails");
        console.log("")

        return (
            <div >

                <Navigation/>
                <Search/>
                <Container >
                        <InnerNavigationBar active={activeElement}/>
                    <Paper className ="paper" style={detailStyle } >
                            Account Details

                    </Paper>
                </Container>

            </div>

        );
    }
}

const activeElement = {
    act1: "nav-link ",
    act2: "nav-link ",
    act3: "nav-link ",
    act4: "nav-link ",
}


const detailStyle = {
    height: '80%',
    width:  '100%',
    fontWeight: 'bold',
    WebkitBorderRadius:'10px 10px 10px 10px',
    textAlign:'center',
    font: 'Helvetica',
    margin: 'auto',

};

AccountDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};



const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state.myInfo;
}


export default connect(mapStateToProps)(AccountDetails);
