import React from 'react';
import Navigation from "./FrameWorkUnity/DynamicNavBar";
import Search from "./FrameWorkUnity/Search";
import Container from "./FrameWorkUnity/Container";
import Paper from '@material-ui/core/Paper';
import InnerNavigationBar from "./FrameWorkUnity/StaticNavBar"
import {navInfo2} from "./FrameWorkUnity/NavDetails";
import {connect} from "react-redux";


const Statement= () => {
    return (
      <div>
        <Paper style={StatementStyle}>
        <div class="container">
            <div class="col-md-9 personal-info">
                <br/>
                <h3><strong>Personal Information</strong></h3>
                <form class="form-horizontal" role="form">

                    <div class="form-group">
                        <label class="col-lg-5 control-label">First Name:</label>
                        <div class="col-lg-8">
                            <input class="form-control" type="text" placeholder="Jane"/>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-lg-5 control-label">Last Name:</label>
                        <div class="col-lg-8">
                            <input class="form-control" type="text" placeholder="Bishop"/>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-lg-3 control-label">Email:</label>
                        <div class="col-lg-8">
                            <input class="form-control" type="text" placeholder="janesemail@gmail.com"/>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-3 control-label">Username:</label>
                        <div class="col-md-8">
                            <input class="form-control" type="text" placeholder="janeuser"/>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-3 control-label">Password:</label>
                        <div class="col-md-8">
                            <input class="form-control" type="password" placeholder="123"/>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-7 control-label">Confirm Password:</label>
                        <div class="col-md-8">
                            <input class="form-control" type="password" placeholder="123"/>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-3 control-label"></label>
                        <div className="col-md-8">
                            <input type="button" className="btn btn-primary" value="Save Changes"/>
                                <span> </span>
                                <input type="reset" className="btn btn-dark" value="Cancel"/>
                        </div>
                    </div>
                    <br/>
                </form>
            </div>
        </div>
        </Paper>
      </div>
    );
}

const ProfileSettingPage = () => {
    return (
        <div >
            <Navigation nav = {navInfo2}/>
            <Search/>
            <Container>
                <InnerNavigationBar active={activeElement}/>
                <Statement/>
            </Container>
        </div>

    );
}


const StatementStyle = {
    position: 'flex',
    height: '100%',
    width:  '100%',
    WebkitBorderRadius:'10px 10px 10px 10px',
    font: 'Helvetica',
}

const activeElement = {
    act1: "nav-link ",
    act2: "nav-link ",
    act3: "nav-link ",
    act4: "nav-link ",
}

const mapStateToProps = (state) => {
    return state;
}
export default connect(mapStateToProps)(ProfileSettingPage);