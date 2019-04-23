import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import InnerNavigationBar from "../FrameWorkUnity/StaticNavBar"
import {connect} from "react-redux";
import axios from "axios";
import { getProfile } from "../../actions/GetProfileAction/getProfileAction";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import * as ACTION from "../../static/action_type";


class BillPay extends React.Component{
    state = {
        payAmountCredit: " ",
        autoPayAmount:"",
        creditAccountNumber: "",
        availableCredit :"",
        currentBalance:"",
        creditLimit:"",
        selectFrom:"",
        open: false,
        time:"",
    };

    componentDidMount() {
        for (let i = 0 ; i < this.props.myInfo.accounts.length ; i++) {
            console.log("111"+i);
            if (this.props.myInfo.accounts[i].type == ACTION.CREDIT) {
                this.setState({creditAccountNumber: this.props.myInfo.accounts[i].account_number});
                this.setState({currentBalance: this.props.myInfo.accounts[i].balance});
                this.setState({availableCredit: this.props.myInfo.accounts[i].available_credit});
                this.setState({creditLimit: this.props.myInfo.accounts[i].credit_limit});
                break;
            }
        }
    }

    renderAccount() {
        const { classes } = this.props;
        if (this.props.myInfo !== " ") {
            return this.props.myInfo.accounts.map(account => {
                if (account.type !== ACTION.CREDIT) {
                    return (
                        <ExpansionPanelDetails onClick={this.selectAccountOne}>
                            <Button className={classes.button}
                                    onClick={() => this.setState({selectFrom: account.account_number})}>
                                {account.alias}: {account.account_number}</Button>
                        </ExpansionPanelDetails>

                    );
                }

            });
        }else { return (<div/>);}
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

    onSubmit =(e) => {
        e.preventDefault();

        console.log('it just submit');
        console.log(this.props);

        if(this.state.payAmountCredit == 0) {
            alert("Bill Pay Amount Can't be 0, try again");
            return
        }

        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}

        axios.post('/api/deposit',
            {amount: parseFloat(this.state.payAmountCredit),
                account_num: this.state.creditAccountNumber},
            {headers: req_headers}
        )
            .then(response => {
                console.log(response);
                alert("Bill Pay Success")

                axios.get("/api/client/all",{headers: req_headers})
                    .then(response => {
                        console.log(response);
                        this.props.getProfile(response.data);
                    }).catch (error => console.log(error.response.data.msg));


            }).catch (error => {
                console.log(error.response.data.msg);
               alert("Bill Pay Fail");
            });


        this.setState({payAmountCredit:  "$ Please Enter Your Amount"});
    }



    /************************************************************************************ */

    AutoPay(con) {

       const req_headers = {Authorization: 'Bearer ' + this.props.myKey}
         if (con == "start") {
              axios.post('/api/autopay', {
                   amount: parseFloat(this.state.autoPayAmount),
                   from: this.state.selectFrom,
                   to: this.state.creditAccountNumber,
                   interval: parseFloat(this.state.time) },
                  {headers: req_headers}
               ).then(response => {
                   console.log(response);
                   alert("Start Auto Pay Success")

               }).catch(error => {
               console.log(error.response.data.msg);
               alert("Start Auto Pay Fail");
           });
       } else {
             axios.delete('api/autopay/stop', {headers: req_headers}
             ).then(response => {
                 console.log(response);
                 alert("Stop Auto Pay Success")
             }).catch(error => {
                 console.log(error.response.data.msg);
                 alert("Stop Auto Pay Fail");
             });
         }
   }
   /************************************************************************************ */

    render() {
        let index = 0;
        for (let i = 0 ; i < this.props.myInfo.accounts.length ; i++) {
            console.log("index i is : "+i);
            if (this.props.myInfo.accounts[i].type == "credit") {
                index =i;
                break;
            }
        }

        const {classes} = this.props;
        return (
            <div >
                <Navigation/>
                <Search/>
                <Container >
                    <form onSubmit={this.onSubmit}>
                        <InnerNavigationBar active={activeElement}/>
                        <div className={classes.paper}>
                            <div style={{float: 'left', width:"40%"}}>
                                <Typography variant="h4" color= "secondary"><strong>SJSP Credit Card</strong></Typography>
                                <Typography variant="h6">SJSP Platinum Visa Card: # {this.props.myInfo.accounts[index].account_number}</Typography>
                                <Typography variant="h6">Current Balance: $ {this.props.myInfo.accounts[index].balance}</Typography>
                                <Typography variant="h6">Credit Limit: $ {this.props.myInfo.accounts[index].credit_limit}</Typography>
                                <Typography variant="h6">Available Credit: $ {this.props.myInfo.accounts[index].available_credit}</Typography>
                            </div>
                            <div style={{float: 'right', width:"30%"}}>
                                <Typography variant="h5"><strong>Amount:</strong></Typography>
                                <input type="number"  className="form-control"  name="amount" step="0.01"
                                       placeholder= "$ Please Enter Your Amount" value = {this.state.payAmountCredit}
                                       onChange ={e=>this.setState({payAmountCredit:e.target.value})}/>
                                <Button  type = "submit"  className={classes.button}  variant="contained" color="primary">
                                    Submit
                                </Button>

                            </div>
                        </div>

                        <br/>
                        <div className={classes.paper}>


                            <div style={{float: 'left', width:"100%"}}>
                                <Typography variant="h4" color= "secondary"><strong>Auto Payment</strong></Typography>
                                <br/>
                            <ExpansionPanel expanded={this.state.open}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} onClick={this.panOneHandler}>
                                    <Typography className={classes.heading} id="firstLabel">Select Account</Typography>
                                </ExpansionPanelSummary>
                                 {this.renderAccount()}
                            </ExpansionPanel>
                                <br/>
                            </div>

                            <div style={{float: 'left', width:"50%"}}>
                                <input type="number" className="form-control" name="amount" step="0.01"
                                       placeholder= "$ Please Enter Your Amount" value = {this.state.autoPayAmount}
                                       onChange ={e=>this.setState({autoPayAmount:e.target.value})}/>
                            </div>

                            <div style={{float: 'right', width:"50%"}}>

                                <input
                                    type="number" className="form-control" name="amount" step="0.01"
                                    placeholder= "Please Enter The Time Interval in Minutes" value = {this.state.time}
                                    onChange ={e=>this.setState({time:e.target.value})}/>
                            </div>

                            <Button className={classes.button} variant="contained" color="primary"
                                    onClick={()=>this.AutoPay("start")}>
                                Start
                            </Button>
                            <Button className={classes.button} variant="contained" color="primary"
                                    onClick={()=>this.AutoPay()}>
                                Stop
                            </Button>
                        </div>
                    </form>
                </Container>
            </div>

        );
    }
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 3,
        width: 'auto',
    },
    root: {
        width: '100%',
    },
    paper: {
        position: 'flex',
        font: 'Helvetica',
        width: '100%',
        height: theme.spacing.unit * 40,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        textAlign: 'center',
        WebkitBorderRadius:'10px 10px 10px 10px',
    },
});



const activeElement = {
    act1: "nav-link ",
    act2: "nav-link active",
    act3: "nav-link ",
    act4: "nav-link ",
}

const checkingContainerStyle = {
    height: '100%',
    width:  '100%',
    textAlign:'center',
    margin: 'auto',
    WebkitBorderRadius:'10px 10px 10px 10px',
    fontWeight: 'bold',
    font: 'Helvetica',
}


BillPay.propTypes = {
    classes: PropTypes.object.isRequired,
};



const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state;
}


export default connect(mapStateToProps,{getProfile})(withStyles(styles)(BillPay));
