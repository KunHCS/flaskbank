import React from 'react';
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";


const CloseAccountPage = () => {
    return (
        <div >
            <Navigation/>
            <Search/>
            <Container>
                <CloseAccountDetails />
            </Container>
        </div>

    );
}


class CloseAccountDetails extends React.Component {
    state={
        username: "",
        email: "",
        password: "",
        flag:false,
    };


    onSubmit =(e) => {

        e.preventDefault();
        console.log("i just submit")

        axios.delete("/api/accounts/delete",
            { data:{username: this.state.username,
                          password: this.state.password,
                          email:this.state.email}} )
            .then(response => {
                alert("Your account is Successfully Closed");
                console.log(response);
                this.setState({flag:true})

            }).catch (error => {
                console.log(error.response.data.msg);
                alert("Fail to Close an Account");
            });

    }


    render(){
        console.log("I m in CloseAccountDetails Page")
        console.log(this.state.username);
        console.log(this.state.password);

        if (this.state.flag == true) {
            return (<Redirect to={'/'}/>)
        }

        return (
                <Paper className ="paper" style={paperStyle} >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mt-5 mx-auto">
                                <form noValidate onSubmit={this.onSubmit}>
                                    <h1 className="h3 mb-3 font-weight-bold font-weight-normal">Close An Account</h1>

                                    <div className="form-group">
                                        <label htmlFor="name">Username:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            placeholder="Enter your user name"
                                            value={this.state.username}
                                            onChange ={e=>this.setState({username:e.target.value})}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email Address:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="Enter email"
                                            value={this.state.email}
                                            onChange ={e=>this.setState({email:e.target.value})}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange ={e=>this.setState({password:e.target.value})}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-primary btn-block"> Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Paper>
        )
    };
}



const paperStyle = {
    height: '100%',
    width:  '100%',
    textAlign:'center',
    margin: 'auto',
    WebkitBorderRadius:'10px 10px 10px 10px',
    fontWeight: 'bold',
    font: 'Helvetica',
};




export default CloseAccountPage;
