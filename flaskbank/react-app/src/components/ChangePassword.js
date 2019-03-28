import React from "react";
//import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
    render() {
        const { classes } = this.props;
        return (
            <div style={getModalStyle()} className={classes.paper}>
                <form noValidate onSubmit={this.onSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Change Password</h1>
                    <div className="form-group">
                        <label htmlFor="name">Old password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="OldPassword"
                            placeholder="Enter your user name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="NewPassword"
                            placeholder="Enter new passwrod"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Enter Password Again</label>
                        <input
                            type="password"
                            className="form-control"
                            name="Newpassword2"
                            placeholder="Please again"
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
