import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {closePopWindow, openPopWindow} from "../../actions/PopWindowStateAction/popWindowStateAction";


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

class AddAccount extends React.Component {
    state = {
        account_name: "",
        account_type:""
    };


    onSubmit =(e) => {
        console.log("I just submit");
        e.preventDefault();

        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}

        console.log(this.props);
        this.props.closePopWindow();

    }

    render() {
        const {classes} = this.props;
        return (
            <div style={getModalStyle()} className={classes.paper}>
                <form noValidate onSubmit={this.onSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal">Add New Account</h1>

                    <div className="form-group">
                        <label htmlFor="name">Account Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Enter New Account Name"
                            value={this.state.account_name}
                            onChange ={e=>this.setState({account_name:e.target.value})}
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
AddAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};



const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state;
}


export default connect(mapStateToProps,{openPopWindow, closePopWindow})(withStyles(styles)(AddAccount));