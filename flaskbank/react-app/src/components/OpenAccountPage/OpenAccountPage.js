import React, {Component} from 'react';
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import {Redirect} from "react-router-dom";



const openAccountPage = () => {
    return (
        <div >
            <Navigation/>
            <Search/>
            <Container>
                <Register/>
            </Container>
        </div>
    );
}



class Register extends Component {

        state = {
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
            errors: {},
            flag: false,
        }

    onChange =(e) => {
        this.setState({ [e.target.name]: e.target.value });
    }


    onSubmit =(e) =>{
        e.preventDefault();
        console.log("i just submit")
       axios .post("/api/register", {
                first_name: this.state.first_name,
                last_name:  this.state.last_name,
                email:      this.state.email,
                username:   this.state.username,
                password:   this.state.password
            })
            .then(response => {
                console.log(response);
                alert("New Account Successfully Created");
                this.setState({flag:true})
            })
            .catch(error => {
                console.log(error.response.data.msg)
                alert("Register Fail, Please Try Again");
                //this.props.logInRequest(error.response)
            });
    };

    render() {

        if (this.state.flag == true) {
            return (<Redirect to={'/'}/>)
        }

        return (
            <Paper className ="paper" style={paperStyle} >
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mt-5 mx-auto">
                            <form noValidate onSubmit={this.onSubmit}>
                                <h1 className="h3 mb-3 font-weight-bold f font-weight-normal">Register</h1>
                                <div className="form-group">
                                    <label htmlFor="name">First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="first_name"
                                        placeholder="Enter your first name"
                                        value={this.state.first_name}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Last name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="last_name"
                                        placeholder="Enter your last name"
                                        value={this.state.last_name}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        placeholder="Enter your user name"
                                        value={this.state.username}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-lg btn-primary btn-block"
                                >
                                    Register!
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </Paper>
        );
    }
}

const paperStyle = {
    height: '100%',
    width:  '100%',
    fontWeight: 'bold',
    WebkitBorderRadius:'10px 10px 10px 10px',
    textAlign:'center',
    font: 'Helvetica',
    margin: 'auto',
};

export default openAccountPage;
