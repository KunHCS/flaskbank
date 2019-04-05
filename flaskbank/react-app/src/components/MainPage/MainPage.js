import React from 'react';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import {navInfo1} from "../FrameWorkUnity/NavDetails";
import ChangePassword from "../ChangePassword/ChangePassword";
import {connect} from "react-redux";
import {logInAction} from "../../actions/LoginAction";
import {Link}from "react-router-dom";
import card from '../../images/card.png';
import card2 from '../../images/card2.png';
import card3 from '../../images/card3.png';
import cards from '../../images/cards1.png';

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
          <div>
              <div> <img src={cards} alt="card" style = {center}/> </div>
              {/*<div> <img src={card2} alt="card" style = {center2}/> </div>*/}
              {/*<div> <img src={card3} alt="card" style = {center3}/> </div>*/}
              <p style= {para}> </p>
            <Paper style ={paperStyle}>
            <div className ="wrapper fadeInDown" style={wrapper}>
            <div id="formContent">
                <form onSubmit={this.onSubmit} >
                    <Typography variant="h6" >Sign On</Typography>
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
          </div>
        )
    };
}

const loginInfo =  userSignOn => {
    return axios
        .post("/api/login", {
            username: userSignOn.username,
            password: userSignOn.password
        })
        .then(response => {
            if (response.status === 201) {
                //store token somewhere
                console.log(response.data.access_token)
            }
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
    border: '3px solid blue',
    opacity: '.9',
    paddingTop: '35px',
    WebkitBorderRadius:'10px 10px 10px 10px',
}

const formContent = {
    WebkitBorderRadius: '10px 10px 10px 10px',
    padding: '30px',
    width: '90%',
    maxWidth: '450px',
    position:'relative',
    textAlign:'center',
    margin: 'auto',
}

const formFooter = {
    position: 'relative',
    padding:'25px',
    textAlign:'center',
    WebkitBorderRadius:'10px 10px 10px 10px',
    borderRadius: '10px 10px 10px 10px',
}
const paperStyle = {
    height: '20%',
    width:  '60%',
    boxShadow: '5px 1px 10px, 5px 1px 10px',
    WebkitBorderRadius:'10px 10px 10px 10px',
    textAlign:'center',
    margin: 'auto',
    font: 'Helvetica',
};

const center = {
    margin: '0',
    position: 'absolute',
    paddingTop: '15px',
    whiteSpace: 'nowrap',
    paddingLeft:'200px',
    paddingBottom: '30px',
    height:'40%',
    width: '50%',
    opacity: '0.98'
}

const center2 = {
    margin: '50px',
    position: 'absolute',
    paddingTop: '20px',
    whiteSpace: 'nowrap',
    paddingLeft:'225px',
    paddingBottom: '30px',
    height:'25%',
    width: '38%',
    opacity: '0.98'
}

const center3 = {
    margin: '100px',
    position: 'absolute',
    paddingTop: '20px',
    whiteSpace: 'nowrap',
    paddingLeft:'250px',
    paddingBottom: '30px',
    height:'25%',
    width: '40%',
    opacity: '0.98'

}

const para = {
    paddingTop: '380px',
    position: 'relative',
}


const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps,{logInAction:logInAction})(mainPage);
