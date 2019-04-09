import React from 'react';
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import Paper from '@material-ui/core/Paper';
import InnerNavigationBar from "../FrameWorkUnity/StaticNavBar"
import {connect} from "react-redux";
import axios from "axios";



class Statement extends React.Component {

    state = {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
    };

    onSubmit =(e) => {
        console.log("I just submit");
        e.preventDefault();

        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}

        console.log(this.props);


        axios.post('/api/client/update',
            { first_name: this.state.first_name,
                   last_name:  this.state.last_name,
                   username: this.state.username,
                   password: this.state.password,
                   email:    this.state.email,
                },
                {headers: req_headers}
            )
                .then(response => {
                    alert("Update Success")
                    console.log(response);

                }).catch (error => {
                    alert("Update Fail");
                    console.log(error.response.data.msg);});
    }


    render() {

        console.log("I am in the Statement page");
        console.log(this.props);
        const {first_name,last_name,email,username} = this.props.myInfo;
        //const {first_name,last_name,email,username} = "";




        return (
            <Paper className ="paper" style={paperStyle} >
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mt-5 mx-auto">
                            <form noValidate onSubmit={this.onSubmit}>
                                <h1 className="h3 mb-3 font-weight-bold f font-weight-normal">Personal Information</h1>
                                <div className="form-group">
                                    <label htmlFor="name">First name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="first_name"
                                        placeholder={first_name}
                                        value={this.state.first_name}
                                        onChange ={e=>this.setState({first_name:e.target.value})}

                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name">Last name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="last_name"
                                        placeholder={last_name}
                                        value={this.state.last_name}
                                        onChange ={e=>this.setState({last_name:e.target.value})}
                                    />
                                </div>
                                       {/* Do NOT DELETE THIS COMMENT SECTION !!!  */}
                                {/*<div className="form-group">*/}
                                    {/*<label htmlFor="name">Username</label>*/}
                                    {/*<input*/}
                                        {/*type="text"*/}
                                        {/*className="form-control"*/}
                                        {/*name="username"*/}
                                        {/*placeholder={username}*/}
                                        {/*value={this.state.username}*/}
                                        {/*onChange ={e=>this.setState({username:e.target.value})}*/}
                                    {/*/>*/}
                                {/*</div>*/}

                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder={email}
                                        value={this.state.email}
                                        onChange ={e=>this.setState({email:e.target.value})}
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
                                        onChange ={e=>this.setState({password:e.target.value})}
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

const ProfileSettingPage = (props) => {
    return (
        <div >
            <Navigation/>
            <Search/>
            <Container>
                <InnerNavigationBar active={activeElement}/>
                <Statement myInfo={props.myInfo}
                           myKey ={props.myKey}
                           />
            </Container>
        </div>

    );
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