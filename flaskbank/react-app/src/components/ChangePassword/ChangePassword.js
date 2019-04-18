import React from "react";
//import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";

function getModalStyle() {
    const top = 50 ;
    const left = 50 ;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});

class ChangePasswordForm extends React.Component {
    state = {
        username: "",
        oldPassword: "",
        newPasswordOne: "",
        newPasswordTwo: "",
    };

    onSubmit =(e) => {
        console.log("I just submit");
        e.preventDefault();

        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}

        console.log(this.props);


        axios.post('/api/client/changepassword',
            {
                username: this.state.username,
                email: this.state.email,
                oldPassword: this.state.oldPassword,
                newPasswordOne: this.state.newPasswordOne,
                newPasswordTwo: this.state.newPasswordTwo,
            },
            {headers: req_headers}
        )
            .then(response => {
                alert("Update Success")
                console.log(response);

            }).catch(error => {
            alert("Update Fail");
            console.log(error.response.data.msg);
        });
    }
    render() {
        const {classes} = this.props;
        // const {username,email,oldPassword,newPasswordOne,newPasswordTwo,classes} = this.props.myInfo;
        return (
            <div style={getModalStyle()} className={classes.paper}>
                <form noValidate onSubmit={this.onSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Change Password</h1>
                    <div className="form-group">
                    <label htmlFor="name">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Username"
                        value={this.state.username}
                        onChange ={e=>this.setState({username:e.target.value})}
                    />
                    </div>
                    {/*<div className="form-group">*/}
                        {/*<label htmlFor="email">Email address</label>*/}
                        {/*<input*/}
                            {/*type="email"*/}
                            {/*className="form-control"*/}
                            {/*name="email"*/}
                            {/*placeholder={this.state.email}*/}
                            {/*value={this.state.email}*/}
                            {/*onChange ={e=>this.setState({email:e.target.value})}*/}
                        {/*/>*/}
                    {/*</div>*/}
                    <div className="form-group">
                        <label htmlFor="password">Old Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Old Password"
                            value={this.state.oldPassword}
                            onChange ={e=>this.setState({oldPassword:e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="New Passwrod"
                            value={this.state.newPasswordOne}
                            onChange ={e=>this.setState({newPasswordOne:e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Enter Password Again</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Enter again"
                            value={this.state.newPasswordTwo}
                            onChange ={e=>this.setState({newPasswordTwo:e.target.value})}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-lg btn-primary btn-block"
                    >
                        Submit
                    </button>
                </form>
            </div>

        );
    }
}
ChangePasswordForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
export default withStyles(styles)(ChangePasswordForm);
