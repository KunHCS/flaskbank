import React, {Component} from 'react';
import Navigation from "./FrameWorkUnity/DynamicNavBar";
import Search from "./FrameWorkUnity/Search";
import Container from "./FrameWorkUnity/Container";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import {navInfo1} from "./FrameWorkUnity/NavDetails";



const openAccountPage = () => {

    return (
        <div >
            <Navigation nav = {navInfo1}/>
            <Search/>
            <Container>
                <Register/>
            </Container>
        </div>

    );
}



const register = newUser => {
    return axios
        .post("/api/register", {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            username: newUser.username,
            password: newUser.password
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log(error));
};

class Register extends Component {
    constructor() {
        super();
        this.state = {
            first_name: "",
            last_name: "",
            username: "",
            email: "",
            password: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        };

        register(newUser);
    }

    render() {
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
                                        placeholder="Enter your lastname name"
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
