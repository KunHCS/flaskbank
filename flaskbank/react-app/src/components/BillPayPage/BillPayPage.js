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
import Paper from '@material-ui/core/Paper';


class BillPay extends React.Component{
    state = {
        payAmountCredit: " ",
        autoPayAmount:"$ Please Enter Your Amount",
        creditAccountNumber: "",
        availableCredit :"",
        currentBalance:"",
        creditLimit:"",
        selectFrom: undefined,
        open: false,
        time: undefined,
        currentAutoPayState: undefined,
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

        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}

        axios.get("/api/client/all",{headers: req_headers})
            .then(response => {
                console.log(response);
                this.props.getProfile(response.data);
            }).catch (error => console.log(error.response.data.msg));

        this.getAutopayStatement()
    }

    renderAccount() {
        const { classes } = this.props;
        if (this.props.myInfo !== " ") {
            return this.props.myInfo.accounts.map(account => {
                if (account.type !== ACTION.CREDIT) {
                    return (
                        <ExpansionPanelDetails onClick={(e)=>{this.selectAccountOne(e);
                            this.setState({selectFrom: account.account_number});}}
                                               >
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

    getAutopayStatement= ()=>{
        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}
        axios.get('/api/autopay/get',{headers: req_headers}
        )
            .then(response => {
                console.log(response);
                this.setState({currentAutoPayState: response.data.auto_pay})
            }).catch (error => {
            console.log(error.response.data.msg);
        });
    }

    renderAutoPayState() {
           if (this.state.currentAutoPayState !== undefined) {
               return this.state.currentAutoPayState.map(account => {
                   return (
                       <div>
                           {account.job_name}
                       </div>
                   );

               });
           } else {return ( <Typography variant="h8" color= "secondary">
                            <strong>No Current Auto Payment SetUp</strong>
                            </Typography>);}

    }

    onSubmit =(e) => {
        e.preventDefault();
        console.log('it just submit');
        console.log(this.props);

        if(this.state.selectFrom == undefined ) {
            alert("Selected Account Can't be Empty");
            return
        }

        if(this.state.payAmountCredit == 0 || this.state.payAmountCredit == "$ Please Enter Your Amount") {
            alert("Bill Pay Amount Can't be 0, Try Again");
            return
        }

        if (this.state.payAmountCredit<0) {
            alert("Bill Pay Amount Can't Negative, Try Again");
            return
        }


        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}
        axios.post('/api/transfer ',
            { account_from: this.state.selectFrom,
                account_to: this.state.creditAccountNumber,
                amount : parseFloat(this.state.payAmountCredit)},
            {headers: req_headers}
        )
            .then(response => {
                console.log(response);
                alert("Bill Pay Succeeded---");
                axios.get("/api/client/all",{headers: req_headers})
                    .then(response => {
                        console.log(response);
                        this.props.getProfile(response.data);
                    }).catch (error => console.log(error.response.data.msg));
            }).catch (error => {
            alert("Bill Pay Failed---" + (error.response.data.msg));
            console.log(error.response.data.msg);
        });
        this.setState({payAmountCredit:  "$ Please Enter Your Amount"});
    }

    /************************************************************************************ */

    AutoPay(con) {

        if (con == "start") {

             if (this.state.selectFrom == undefined) {
                 alert("Selected Account Can't be Empty ");
                 return
             }

             if (this.state.autoPayAmount == 0 || this.state.autoPayAmount == "$ Please Enter Your Amount") {
                 alert("AutoPay Amount Can't be 0 or Empty ");
                 return
             }

             if (this.state.time == undefined) {
                 alert("Time Interval Can't Be Empty");
                 return
             }

            if (this.state.autoPayAmount<0) {
                alert("Bill AutoPay Amount Can't Negative, Try Again");
                return
            }

            if (this.state.time<0) {
                alert("Time Can't Negative, Try Again");
                return
            }
        }

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
                   alert("Start AutoPay Succeeded--" +response.data.msg)
                  this.getAutopayStatement()
               }).catch(error => {
               console.log(error.response.data.msg);
               alert("Start AutoPay Failed---" +error.response.data.msg);
           });
       } else {
             axios.delete('api/autopay/stop', {headers: req_headers}
             ).then(response => {
                 console.log(response);
                 alert("Stop AutoPay Succeed---" +response.data.msg)
                 this.setState({currentAutoPayState:undefined})
             }).catch(error => {
                 console.log(error.response.data.msg);
                 alert("Stop AutoPay Failed---" +error.response.data.msg);
             });
         }
   }
   /************************************************************************************ */

    render() {
       const {classes} = this.props;
       let index = null;
        for (let i = 0 ; i < this.props.myInfo.accounts.length ; i++) {
            console.log("index i is : "+i);
            if (this.props.myInfo.accounts[i].type == "credit") {
                index =i;
                break;
            }
        }

        if (index === null) {
            return (
                <div >
                <Navigation/>
                <Search/>
                <Container>
                    <InnerNavigationBar active={activeElement}/>
                    <div className={classes.paper}>
                    <Typography variant="h4" color= "secondary"><strong>You Currently Don't Have a Credit Card Account</strong></Typography>
                    </div>
                </Container>
                </div>
            )
        }

        return (
            <div >
                <Navigation/>
                <Search/>
                <Container >
                    <form onSubmit={this.onSubmit}>
                        <InnerNavigationBar active={activeElement}/>
                        <div className={classes.paper}>
                            <div style={{float: 'left', width:"60%"}}>
                                <Typography variant="h4" color= "secondary" style={{textAlign:'center'}}><strong>SJSP Credit Card</strong></Typography>
                                <br/>
                                <Typography variant="body1"><strong>SJSP Platinum Visa Card: </strong> {this.props.myInfo.accounts[index].account_number}</Typography>
                                <Typography variant="body1"><strong>Current Balance: </strong>${this.props.myInfo.accounts[index].balance * -1}</Typography>
                                <Typography variant="body1"><strong>Credit Limit: </strong> ${this.props.myInfo.accounts[index].credit_limit}</Typography>
                                <Typography variant="body1"><strong>Available Credit: </strong>${this.props.myInfo.accounts[index].available_credit}</Typography>
                            </div>
                            <div style={{float: 'right', width:"30%"}}>
                                <Typography variant="h6">Amount:</Typography>
                                <input type="number"
                                       className="form-control"
                                       name="amount"
                                       step="0.01"
                                       min="0"
                                       max="1000000"
                                       maxLength={7}
                                       placeholder= "$ Enter Your Amount"
                                       onKeyDown="return event.keyCode !== 69"
                                       value = {this.state.payAmountCredit}
                                       onChange ={e=>this.setState({payAmountCredit:e.target.value})}/>
                                <hr/>
                                <Typography variant="h6">Select Account:</Typography>
                                <ExpansionPanel expanded={this.state.open}>
                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} onClick={this.panOneHandler}>
                                        <Typography className={classes.heading}  id="firstLabel">Select Account</Typography>
                                    </ExpansionPanelSummary>
                                    {this.renderAccount()}
                                </ExpansionPanel>
                                <Button
                                         className={classes.button}
                                         type = "submit"
                                         variant="contained"
                                         color="primary">
                                    Submit
                                </Button>
                            </div>
                        </div>
                        <br/>
                        <div className={classes.paper}>
                            <div style={{float: 'left', width:"100%"}}>
                                <Typography variant="h4" color= "secondary" style={{textAlign:'center'}}><strong>Auto Payment</strong></Typography>
                                <hr/>
                            </div>
                            <div style={{float: 'left', width:"49%"}}>
                                <input type="number"
                                       className="form-control"
                                       name="amount"
                                       step="0.01"
                                       min="0"
                                       max="1000000"
                                       maxLength={7}
                                       onKeyDown="return event.keyCode !== 69"
                                       placeholder= "$ Enter Your Amount"
                                       value = {this.state.autoPayAmount}
                                       onChange ={e=>this.setState({autoPayAmount:e.target.value})}/>
                            </div>
                            <div style={{float: 'right', width:"49%"}}>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    step="0.01"
                                    min="0"
                                    max="525600"
                                    maxLength={6}
                                    onKeyDown="return event.keyCode !== 69"
                                    placeholder= "Enter The Time Interval in Minutes"
                                    value = {this.state.time}
                                    onChange ={e=>this.setState({time:e.target.value})}/>
                            </div>

                            <div style={{float: 'right', width:"40%"}}>
                            <Button className={classes.button} variant="contained" color="primary"
                                    onClick={()=>this.AutoPay("start")}
                                    >
                                Start AutoPay
                            </Button>

                            <Button className={classes.button} variant="contained" color="primary"
                                    onClick={()=>this.AutoPay()}
                                     >
                                Stop AutoPay
                            </Button>
                            </div>

                            <div style={{float: 'left', width:"100%"}}>
                            <Paper className="paper" style={detailStyle} >
                                <Typography variant="h6" color= "secondary"><strong>Current Auto Payment List </strong></Typography>
                                <div>
                                    {this.renderAutoPayState()}
                                </div>
                            </Paper>
                            </div>

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
        height: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        textAlign: 'left',
        WebkitBorderRadius:'10px 10px 10px 10px',
    },
});

const detailStyle = {
    height: 'auto',
    width:  '100%',
    fontWeight: 'bold',
    WebkitBorderRadius:'10px 10px 10px 10px',
    textAlign:'center',
    font: 'Helvetica',
    margin: 'auto',

};

const activeElement = {
    act1: "nav-link ",
    act2: "nav-link active",
    act3: "nav-link ",
    act4: "nav-link ",
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
