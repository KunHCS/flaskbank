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

class RemoveSingleAccount extends React.Component {
    state = {
        currentAccount:"",
        currentBalance: "",
        myAccount:"",

        open: false,
    };



    onSubmit =(e) => {
        console.log("I just submit");
        e.preventDefault();

        console.log(this.state.currentBalance);

        if (this.state.myAccount.type !=="credit" && parseFloat(this.state.currentBalance)<0 ) {
            alert("Account Can't be Closed While It Has a Negative Balance")
            return;
        }


        if(this.state.myAccount.type=="credit" && parseFloat(this.state.myAccount.balance)>0) {
             alert("Credit Account Can't be Closed While It Has a Negative Balance")
             return;
        }




        console.log(this.props);

        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}

        console.log(this.state.currentAccount);

        axios.delete('api/accounts/close/'+this.state.currentAccount,
            {headers: req_headers}
        )
            .then(response => {
                console.log(response);
                alert("Account Close Succeeded---")

                axios.get("/api/client/all",{headers: req_headers})
                    .then(response => {
                        console.log(response);
                        this.props.getProfile(response.data);
                    }).catch (error => console.log(error.response.data.msg));

            }).catch (error => {
            console.log(error.response.data.msg);
            alert("Account Close Failed---");//+error.response.data.msg);
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

    renderAccount() {
        const { classes } = this.props;
        if (this.props.myInfo !== " ") {
            return this.props.myInfo.accounts.map(account => {
                    return (
                        <ExpansionPanelDetails  onClick={(e)=>{this.selectAccountOne(e);
                            this.setState({currentAccount: account.account_number,
                                currentBalance: account.balance ,myAccount:account});}}>

                            <Button className={classes.button}
                                    onClick={() => this.setState({currentAccount: account.account_number,
                                        currentBalance: account.balance ,myAccount:account})}>
                                {account.alias}: {account.account_number}</Button>
                        </ExpansionPanelDetails>
                    );
            });
        }else { return (<div/>);}
    }


    render() {
        const {classes} = this.props;
        console.log(this.state.currentAccount);
        console.log(this.state.currentBalance);
        return (
            <div style={getModalStyle()} className={classes.paper}>
                <form noValidate onSubmit={this.onSubmit}>
                    <h1 className="h3 mb-3 font-weight-normal"><strong>Remove Account</strong></h1>

                  <Typography variant={"h6"}> <label htmlFor="name">Account Type:</label> </Typography>

                    <ExpansionPanel expanded={this.state.open}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} onClick={this.panOneHandler}>
                            <Typography className={classes.heading} id="firstLabel">Select an Account To Remove</Typography>
                        </ExpansionPanelSummary>

                        {this.renderAccount()}
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




RemoveSingleAccount.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state;
}

export default connect(mapStateToProps,{closePopWindow,getProfile})(withStyles(styles)(RemoveSingleAccount));