import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {closePopWindow} from "../../actions/PopWindowStateAction/popWindowStateAction";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import * as ACTION from "../../static/action_type";
import { getProfile } from "../../actions/GetProfileAction/getProfileAction";

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
        account_name:"",
        account_type:"",
        open: false,
    };


    onSubmit =(e) => {
        console.log("I just submit");
        e.preventDefault();
        console.log(this.props);

         if (this.state.account_name == "") {
             alert("Account Name Can't be Empty")
             return;
         }

        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}


        axios.post('api/accounts/open',
            {alias: this.state.account_name,
                  type: this.state.account_type,
                  deposit: 0},
            {headers: req_headers}
        )
            .then(response => {
                console.log(response);
                alert("Account Open Succeeded---")

                   axios.get("/api/client/all",{headers: req_headers})
                       .then(response => {
                        console.log(response);
                        this.props.getProfile(response.data);
                       }).catch (error => console.log(error.response.data.msg));

            }).catch (error => {
            console.log(error.response.data.msg);
            alert("Account Open Failed---");//+error.response.data.msg);
        });

        this.props.closePopWindow();

    }


    selectAccountOne = (event) =>{
        const labelFrom = document.getElementById('firstLabel');
        labelFrom.innerHTML = event.currentTarget.innerHTML;
        this.setState({open: false});
    };


    panOneHandler = () =>{
        if(this.state.open){
            this.setState({open: false});
        }
        else{
            this.setState({open: true});
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div style={getModalStyle()} className={classes.paper}>
                <form noValidate onSubmit={this.onSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal"><strong>Add a New Account</strong></h1>

                    <div className="form-group">
                        <Typography variant={"h6"}> <label htmlFor="name">Account Name:</label> </Typography>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            placeholder="Enter a New Account Name"
                            minLength={"1"}
                            maxLength={"50"}
                            value={this.state.account_name}
                            onChange ={e=>this.setState({account_name:e.target.value})}
                        />
                    </div>

                    <Typography variant={"h6"}>  <label htmlFor="name">Account Type:</label> </Typography>


                        <ExpansionPanel expanded={this.state.open}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} onClick={this.panOneHandler}>
                                <Typography className={classes.heading} id="firstLabel">Select Account Type</Typography>
                            </ExpansionPanelSummary>

                            <ExpansionPanelDetails  onClick={(e)=>{this.selectAccountOne(e);
                                      this.setState({account_type: ACTION.CHECKING});}}>
                                <Button className={classes.button}
                                        onClick={() => this.setState({account_type: ACTION.CHECKING})}>
                                    Checking Account</Button>
                            </ExpansionPanelDetails>


                            <ExpansionPanelDetails onClick={(e)=>{this.selectAccountOne(e);
                                this.setState({account_type: ACTION.SAVING});}}>
                                <Button className={classes.button}
                                        onClick={() => this.setState({account_type: ACTION.SAVING})}>
                                    Saving Account</Button>
                            </ExpansionPanelDetails>

                            <ExpansionPanelDetails onClick={(e)=>{this.selectAccountOne(e);
                                this.setState({account_type: ACTION.CREDIT});}}>
                                <Button className={classes.button}
                                        onClick={() => this.setState({account_type: ACTION.CREDIT})}>
                                    Credit Card Account</Button>
                            </ExpansionPanelDetails>

                        </ExpansionPanel>


                    <hr/>
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


export default connect(mapStateToProps,{ closePopWindow,getProfile})(withStyles(styles)(AddAccount));