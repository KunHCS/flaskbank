import React from 'react';
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import Paper from '@material-ui/core/Paper';
import InnerNavigationBar from "../FrameWorkUnity/StaticNavBar"
import {connect} from "react-redux";
import axios from "axios";
import * as ACTION from "../../static/action_type";



class Statement extends React.Component {

    state = {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        current_password: "",
        password:"",
    };

    onSubmit =(e) => {
        console.log("I just submit");
        e.preventDefault();


        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
            alert('Invalid Email Format');
            return;
        }


        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}

        console.log(this.props);


        axios.post('/api/client/update',
            { first_name: this.state.first_name,
                last_name:  this.state.last_name,
                account_name: this.state.username,
                current_password: this.state.current_password,
                password: this.state.password,
                email:    this.state.email,
            },
            {headers: req_headers}
        )
            .then(response => {
                alert("Update Success")
                console.log(response);

                axios.get("/api/client/all",{headers: req_headers})
                    .then(response => {
                        console.log(response);
                        this.props.getProfile(response.data);
                    }).catch (error => console.log(error.response.data.msg));

            }).catch (error => {
            alert("Update Failed---"+error.response.data.msg);
            console.log(error.response.data.msg);});
    }


    onChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);

        if(e.target.name==='first_name' ||e.target.name === 'last_name') {
            if (/^[a-zA-Z_\-\s]+$/.test(e.target.value) || e.target.value==="") {
                this.setState({[e.target.name]: e.target.value});
            }
        }else {
            this.setState({[e.target.name]: e.target.value});
        }

    }

    render() {

        console.log("I am in the Statement page");
        console.log(this.props);
        const {first_name,last_name,email,username} = this.props.myInfo;
        //const {first_name,last_name,email,account_name} = "";




        return (
            <Paper className ="paper" style={paperStyle} >
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mt-5 mx-auto">
                            <form noValidate onSubmit={this.onSubmit}>
                                <h1 className="h3 mb-3 font-weight-bold f font-weight-normal">Personal Information</h1>
                                <div className="form-group">
                                    <label htmlFor="name">First Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="first_name"
                                        maxLength={"50"}
                                        placeholder={first_name}
                                        value={this.state.first_name}
                                        onChange ={this.onChange}

                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Last Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="last_name"
                                        maxLength={"50"}
                                        placeholder={last_name}
                                        value={this.state.last_name}
                                        onChange ={this.onChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email Address:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        maxLength="50"
                                        placeholder={email}
                                        value={this.state.email}
                                        onChange ={this.onChange}
                                    />
                                </div>
                                <div className="form-group">

                                    <label htmlFor="password">Old Password</label>

                                    <input
                                        type="password"
                                        className="form-control"
                                        name="current_password"
                                        placeholder="Old Password"
                                        maxLength="50"
                                        value={this.state.current_password}
                                        onChange ={this.onChange}
                                    />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="name">New Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="New Password"
                                        maxLength="50"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary btn-block"
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Paper>
        );
    }
}

class ProfileSettingPage extends React.Component {

    render() {

        if (this.props.userType == ACTION.CLIENT) {
            return (
                <div>
                    <Navigation/>
                    <Search/>
                    <Container>
                        <InnerNavigationBar active={activeElement}/>
                        <Statement myInfo={this.props.myInfo}
                                   myKey={this.props.myKey}
                        />
                    </Container>
                </div>

            );
        }
        else if (this.props.userType == ACTION.MANAGER) {
            return (
                <div>
                    <Navigation/>
                    <Search/>
                    <Container>
                        <Statement myInfo={this.props.myInfo}
                                   myKey={this.props.myKey}
                        />
                    </Container>
                </div>
            )
        }
    }
}



const paperStyle = {
    height: '80%',
    width:  '90%',
    fontWeight: 'bold',
    WebkitBorderRadius:'10px 10px 10px 10px',
    textAlign:'center',
    font: 'Helvetica',
    margin: 'auto',
};


const activeElement = {
    act1: "nav-link ",
    act2: "nav-link ",
    act3: "nav-link ",
    act4: "nav-link ",
}

const mapStateToProps = (state) => {;
    console.log(state);
    return state;

}

export default connect(mapStateToProps)(ProfileSettingPage);
