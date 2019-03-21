import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Navigation from "./FrameWorkUnity/DynamicNavBar";
import Search from "./FrameWorkUnity/Search";
import Container from "./FrameWorkUnity/Container";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import {navInfo1} from "./FrameWorkUnity/NavDetails";
import ChangePassword from "./ChangePassword";
import {connect} from "react-redux";
import {logInAction} from "../actions/LoginAction";
import {Link}from "react-router-dom";


const mainPage = (props) => {
    return (
        <div >
            <Button variant="contained" onClick={()=>props.logInAction(true)} >
                Log In
            </Button>
            <Button variant="contained" onClick={()=>props.logInAction(false)} >
                Log out
            </Button>
            <Navigation nav = {navInfo1}/>
            <Search/>
            <Container>
                <Login/>
            </Container>
        </div>

    );
}


class Login extends React.Component {
    state = {username:"",password:"", open:false};
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onSubmit =(e) => {
        e.preventDefault();
        console.log('it just submit');
        const user = {
            username: this.state.username,
            password: this.state.password
        };

        loginInfo (user);
    }

    render(){
        return (
            <Paper style ={paperStyle}>
            <div className ="wrapper fadeInDown" style={wrapper}>
            <div id="formContent">
                <form onSubmit={this.onSubmit} >
                    <Typography variant="h6">Sign On</Typography>
                    <hr/>
                        <div style={{margin: '50px'}}>
                            <input
                                style={{margin: '20px'}}
                                type = "text"
                                placeholder="User Name"
                                value = {this.state.username}
                                onChange ={e=>this.setState({username:e.target.value})}
                            />
                            <input

                                type = "password"
                                placeholder="Password"
                                value = {this.state.password}
                                onChange ={e=>this.setState({password:e.target.value})}
                            />
                        </div>

                        <Button variant="contained" type="submit"
                                style={{margin:'10px'}} >

                            <Link to = "/overview">Sign On </Link>

                        </Button>

                        <div id="formFooter" style={formFooter}>
                            <a className="underlineHover" href= "#" onClick={this.handleOpen}>Forgot Password?</a>
                        </div>
                </form>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <ChangePassword/>
                </Modal>
            </div>
            </div>
            </Paper>

        )
    };
}



const loginInfo =  userSignOn => {
    return axios
        .post("/api/auth", {
            username: userSignOn.username,
            password: userSignOn.password
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log(error));
};



const wrapper = {
    display: 'flex',
    alignItems: 'center',
    flexDirection:'column',
    justifyContent:'center',
    minHeight: '100%',
    width:'100%',
    padding: '20px',
    border: '1.5px solid blue',
    opacity: '.9',
    paddingTop: '35px',
}



const formContent = {
    webkitBorderRadius: '10px 10px 10px 10px',
    borderRadius:'10px 10px 10px 10px',
    padding: '30px',
    width: '90%',
    maxWidth: '450px',
    position:'relative',
    textAlign:'center',
    boxShadow: '0 30px 60px 0 rgba(0,0,50,0.3)',
}

const formFooter = {
    position: 'relative',
    padding:'25px',
    textAlign:'center',
    //webkitBorderRadius:'0 0 10px 10px',
    //borderRadius: '0 0 10px 10px',
}
const paperStyle = {
    height: '20%',
    width:  '40%',
    boxShadow: '5px 1px 10px, 5px 1px 10px',
    textAlign:'center',
    position: 'relative',
};



const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps,{logInAction:logInAction})(mainPage);
