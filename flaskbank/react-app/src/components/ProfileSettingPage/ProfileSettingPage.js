import React from 'react';
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import Paper from '@material-ui/core/Paper';
import InnerNavigationBar from "../FrameWorkUnity/StaticNavBar"
import {connect} from "react-redux";


class Statement extends React.Component {
    render() {

        console.log("I am in the Statement page");
        console.log(this.props);
        const {first_name,last_name,email,username} = this.props;
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
                                        <input class="form-control" type="text" placeholder={first_name}/>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-lg-5 control-label">Last Name:</label>
                                    <div class="col-lg-8">
                                        <input class="form-control" type="text" placeholder={last_name}/>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-lg-3 control-label">Email:</label>
                                    <div class="col-lg-8">
                                        <input class="form-control" type="text" placeholder={email}/>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="col-md-3 control-label">Username:</label>
                                    <div class="col-md-8">
                                        <input class="form-control" type="text" placeholder={username}/>
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
}

const ProfileSettingPage = (props) => {
    console.log("hfhfghgfhfghfghfghfhfhfh");
    console.log(props);
    return (
        <div >
            <Navigation/>
            <Search/>
            <Container>
                <InnerNavigationBar active={activeElement}/>
                <Statement first_name={props.first_name}
                           last_name ={props.last_name}
                           email={props.email}
                           username={props.username}/>
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
    console.log("lalalala");
    console.log(state);
    return state.myInfo;

}

export default connect(mapStateToProps)(ProfileSettingPage);