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


const mainPage = () => {
    return (
        <div >
            <Navigation nav = {navInfo1}/>
            <Search/>
            <Container>
                <Login/>
            </Container>
        </div>

    );
}


class Login extends React.Component {
    state = {username:"",password:"", open:false,};
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onSumbit =(e) => {
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
                <form onSubmit={this.onSumbit} >
                        Sign On
                    <hr/>
                        <div>
                            <input

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

                        <Button variant="contained" type="submit" href="/overview" style={{margin:'20px'}} >
                            Sign On
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
}



const formContent = {
    webkitBorderRadius: '10px 10px 10px 10px',
    borderRadius:'10px 10px 10px 10px',
    background: '#fff',
    padding: '30px',
    width: '90%',
    maxWidth: '450px',
    position:'relative',
    boxShadow: '0 30px 60px 0 rgba(0,0,0,0.3)',
    textAlign:'center',
}

const formFooter = {
    borderTop:'1px solid #dce8f1',
    padding:'25px',
    textAlign:'center',
    webkitBorderRadius:'0 0 10px 10px',
    borderRadius: '0 0 10px 10px',
}
const paperStyle = {
    height: 400,
    width:  300,
    boxShadow: '-5px 1px 10px, 5px 1px 10px',
};
export default mainPage;
