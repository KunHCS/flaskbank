import React from "react";
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
        email: "",
        password: "",
    };

    onSubmit =(e) => {
        console.log("I just submit");
        e.preventDefault();

        if (this.state.username == "") {
            alert("Username Can't be Empty")
            return;
        }

        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
            alert("Email Can't be Empty or Invalid Email Format");
            return;
        }

        if (this.state.password == "") {
            alert("Password Can't be Empty")
            return;
        }

        console.log(this.props);


        axios.post('/api/reset',
            {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            },
        )
            .then(response => {
                alert("Change Password Succeeded---")
                console.log(response);

            }).catch(error => {
            alert("Change Password Failed---");//+ error.response.data.msg);
            console.log(error.response.data.msg);
        });
    }
    render() {
        const {classes} = this.props;
        return (
            <div style={getModalStyle()} className={classes.paper}>
                <form noValidate onSubmit={this.onSubmit}>
                    <div style={{textAlign: 'center'}}>
                        <h1 className="h3 mb-3 font-weight-normal">Forget Password</h1>
                    </div>
                    <div className="form-group">
                    <label htmlFor="name">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="username"
                        placeholder="Username"
                        maxLength={"50"}
                        value={this.state.username}
                        onChange ={e=>this.setState({username:e.target.value})}
                    />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            maxLength={"50"}
                            value={this.state.email}
                            onChange ={e=>this.setState({email:e.target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">New Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="New Password"
                            minLength={"1"}
                            maxLength={"50"}
                            value={this.state.password}
                            onChange ={e=>this.setState({password:e.target.value})}
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

export default withStyles(styles)(ChangePasswordForm);
