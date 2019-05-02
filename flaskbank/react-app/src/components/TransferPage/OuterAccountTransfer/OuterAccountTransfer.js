import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Navigation from "../../FrameWorkUnity/DynamicNavBar";
import Search from "../../FrameWorkUnity/Search";
import Container from "../../FrameWorkUnity/Container";
import InnerNavigationBar from "../../FrameWorkUnity/StaticNavBar"
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios";
import * as ACTION from "../../../static/action_type";
import {Link} from "react-router-dom";



class OuterAccountTransfer extends React.Component{
    state = {
        open: false,
        transferAmount: "$ Enter Your Amount",
        selectFrom: undefined,
        selectTo: undefined,
    };


    componentDidMount() {
    }

    onSubmit  =(e) => {
        e.preventDefault();
        console.log("I just submit");

        if(this.state.selectFrom == undefined || this.state.selectTo == undefined) {
            alert("Selected Account can't be empty ");
            return
        }

        if(this.state.transferAmount === 0 || this.state.transferAmount== "$ Enter Your Amount") {
            alert("The Transfer Amount Cant be 0, Please Try Again");
            return
        }


        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}

        axios.post('/api/transfer ',
            { account_from: this.state.selectFrom,
                account_to: this.state.selectTo,
                amount : parseFloat(this.state.transferAmount)},
            {headers: req_headers}
        )
            .then(response => {
                console.log(response);
                alert("Money Transfer success");

            }).catch (error => {
            alert("Money Transfer Fail!! ---" + (error.response.data.msg));
            console.log(error.response.data.msg);
        });

        this.setState({transferAmount: "$ Enter Your Amount"})
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



    renderAccount1() {
        const { classes } = this.props;
        if (this.props.myInfo !== " ") {
            return this.props.myInfo.accounts.map(account => {
                return (
                    <ExpansionPanelDetails onClick={this.selectAccountOne}>
                        <Button className={classes.button} onClick={this.selectAccount}
                                onClick={()=>this.setState({selectFrom:account.account_number})}>
                            {account.alias}: {account.account_number}</Button>
                    </ExpansionPanelDetails>
                );
            });
        }else { return (<div/>);}
    }


    render() {
        const {classes} = this.props;
        console.log("I am in Transfer Page")
        console.log(this.props);
        console.log(this.props.myKey);
        console.log(this.state.selectFrom);
        console.log(this.state.selectTo);
        console.log(this.state.transferAmount);


        return (
            <div>
                <Navigation/>
                <Search/>
                <Container>
                    <form onSubmit={this.onSubmit}>
                    <InnerNavigationBar active={activeElement}/>


                    <Paper className={classes.innerPaper2} style={{position: 'flex'}}>
                        <Typography variant="h4" color = "secondary"><strong>External Accounts Transfer</strong></Typography>
                        <hr/>
                        <Typography variant="h6" color = "secondary"><strong>Transfer From:</strong></Typography>
                        <br/>

                        <ExpansionPanel expanded={this.state.open}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} onClick={this.panOneHandler}>
                                <Typography
                                    className={classes.heading}
                                    id="firstLabel"
                                >Select Account</Typography>
                            </ExpansionPanelSummary>

                            {this.renderAccount1()}
                        </ExpansionPanel>
                        <br/>

                        <Typography variant="h6" color = "secondary"><strong>Transfer To:</strong></Typography>
                        <br/>

                        <input
                            type="text"
                            className="form-control"
                            name="accountNumber"
                            placeholder="Other Bank Account Number"
                            value={this.state.selectTo}
                            onChange ={e=>this.setState({selectTo:e.target.value})}
                        />


                        <br/>
                        <div>

                            <div style={{float: 'right', width:'10%', marginRight: '280px'}}>
                                <Typography variant="h6" style={{float: 'left', width:'30%', marginLeft: '200px'}}>Amount:</Typography>
                                <input
                                    style={{float: 'left', width:'180%', marginLeft: '200px'}}
                                    type="number"
                                    className={classes.button}
                                    name="amount"
                                    step="0.01"
                                    min="0"
                                    max="999999999"
                                    placeholder= "$ Enter Your Amount"
                                    value = {this.state.transferAmount}
                                    onChange ={e=>this.setState({transferAmount:e.target.value})}
                                />
                            </div>
                        </div>
                        <br/>
                        <div>
                            <br/>
                            <Button variant="contained" color="primary"
                                    className={classes.button}
                                    onClick={() => this.props.history.push('/transfer')}
                            >
                                Previous
                            </Button>
                            <Button
                                    type ="submit"
                                    variant="contained" color="primary"
                                    className={classes.button}
                            > Next
                            </Button>
                        </div>
                    </Paper>
                    </form>
                </Container>
            </div>
        );
    }
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit * 2,
        width: 'auto',
        position: 'flex',
    },
    root: {
        width: '100%',
    },
    paper: {
        position: 'flex',
        width: '100%',
        height: theme.spacing.unit * 20,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 2,
        outline: 'none',
        WebkitBorderRadius:'10px 10px 10px 10px',
        textAlign: 'center',
    },
    innerPaper:{
        position: 'flex',
        width: '100%',
        height: '100%',
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        outline: 'none',
        WebkitBorderRadius:'10px 10px 10px 10px',
    },

    innerPaper2:{
        position: 'flex',
        width: '100%',
        height: theme.spacing.unit * 70,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        outline: 'none',
        WebkitBorderRadius:'10px 10px 10px 10px',
    },

    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

const activeElement = {
    act1: "nav-link ",
    act2: "nav-link ",
    act3: "nav-link active",
    act4: "nav-link ",
}

OuterAccountTransfer.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state;
}



export default connect(mapStateToProps)(withStyles(styles)(OuterAccountTransfer));
