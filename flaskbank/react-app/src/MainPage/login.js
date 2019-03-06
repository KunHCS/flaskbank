import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'


class Login extends React.Component {

     state = {username:"",password:""};


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

                         </div>
                          <button
                              type="Sign On"
                              // className="btn btn-lg btn-primary btn-block"
                          >
                              Sign On
                          </button>



                      </form>
                  </Paper>
             </div>
         )
     };
}

const paperStyle = {
    height: 400,
    width:  300,
    boxShadow: '-5px 10px 25px, 5px 10px 25px',

};
export default Login;