import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import axios from "axios";


class Login extends React.Component {

      state = {username:"",password:""};


    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        };

        loginInfo (user);
    }

    render(){
        return (
              <div>
                  <Paper className ="paper" style={paperStyle}>
                       Sign On
                      <form>
                         <div>
                          <input
                              type = "text"
                              placeholder="User Name"
                              value = {this.state.username}
                              onChange ={e=>this.setState({username:e.target.value})}
                           />

                          <input
                              type = "text"
                              placeholder="Password"
                              value = {this.state.password}
                              onChange ={e=>this.setState({password:e.target.value})}
                          />
                          <br/><br/>
                         </div>
                          <Button variant="contained" type="submit" >
                              Sign On
                          </Button>

                      </form>
                  </Paper>
             </div>
         )
     };
}



const loginInfo =  userSignOn => {
    return axios
        .post("/api/user", {
            // username: newUser.username,
            // password: newUser.password
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => console.log(error));
};



const paperStyle = {
    height: 400,
    width:  300,
    boxShadow: '-5px 10px 25px, 5px 10px 25px',

};
export default Login;