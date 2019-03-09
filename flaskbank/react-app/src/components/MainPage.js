import React from 'react';
import Navigation from "./BaseFrameWork/Navigation";
import Search from "./BaseFrameWork/Search";
import Container from "./BaseFrameWork/Container";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'



const mainPage = () => {
    return (
        <div >
            <Navigation/>
            <Search/>
            <Container>
                <Login/>
            </Container>
        </div>

    );
}


class Login extends React.Component {

    state = {username:"",password:""};

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
            <div>
                <form onSubmit={this.onSumbit}>
                    <Paper className ="paper" style={paperStyle} >
                        Sign On
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
                        <Button variant="contained" type="submit"  >
                            Sign On
                        </Button>
                    </Paper>
                </form>

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
            console.log(response);
        })
        .catch(error => console.log(error));
};



const paperStyle = {
    height: 400,
    width:  300,
    boxShadow: '-5px 1px 10px, 5px 1px 10px',
};
export default mainPage;
