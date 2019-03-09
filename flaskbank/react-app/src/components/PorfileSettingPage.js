import React from 'react';
import Navigation from "./FrameWorkUnity/DynamicNavBar";
import Search from "./FrameWorkUnity/Search";
import Container from "./FrameWorkUnity/Container";
import Paper from '@material-ui/core/Paper';
import InnerNavigationBar from "./FrameWorkUnity/StaticNavBar"
import {navInfo2} from "./FrameWorkUnity/NavDetails";

const Statement= () => {
    return (
        <Paper style={StatementStyle}>
        <div class="container">
            <div class="col-md-9 personal-info">
                <h3>Personal info</h3>
                <form class="form-horizontal" role="form">

                    <div class="form-group">
                        <label class="col-lg-3 control-label">First name:</label>
                        <div class="col-lg-8">
                            <input class="form-control" type="text" placeholder="Jane"/>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-lg-3 control-label">Last name:</label>
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
                        <label class="col-md-3 control-label">Confirm password:</label>
                        <div class="col-md-8">
                            <input class="form-control" type="password" placeholder="123"/>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-md-3 control-label"></label>
                        <div className="col-md-8">
                            <input type="button" className="btn btn-primary" value="Save Changes"/>
                                <span></span>
                                <input type="reset" className="btn btn-default" value="Cancel"/>
                        </div>
                    </div>

                </form>
            </div>
        </div>
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
    height: 700,
    width:  800,

    boxShadow: '-2px 5px 25px, 2px 5px 25px',
    margin: '20px'
}

export default ProfileSettingPage;