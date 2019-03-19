import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Navigation from "./FrameWorkUnity/DynamicNavBar";
import Search from "./FrameWorkUnity/Search";
import Container from "./FrameWorkUnity/Container";
import InnerNavigationBar from "./FrameWorkUnity/StaticNavBar"
import {navInfo2} from "./FrameWorkUnity/NavDetails";
import PropTypes from "prop-types";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        width: '300px',
    },
    root: {
        width: '100%',
    },
    paper: {
        position: 'absolute',
        marginLeft: theme.spacing.unit * 15,
        width: theme.spacing.unit * 80,
        height: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    innerPaper:{
        width: theme.spacing.unit * 30,
        height: theme.spacing.unit * 40,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

class Transfer extends React.Component{
    state = {
        open1: false,
        open2: false,
        transferAmount: 500,
    };
    selectAccountOne = (event) =>{
        const labelFrom = document.getElementById('firstLabel');
        labelFrom.innerHTML = event.currentTarget.innerHTML;
        this.setState({open1: false});
    };

    selectAccountTwo = (event) =>{
        const labelFrom = document.getElementById('secondLabel');
        labelFrom.innerHTML = event.currentTarget.innerHTML;
        this.setState({open2: false});
    };
    panOneHandler = () =>{
        if(this.state.open1){
            this.setState({open1: false});
        }
        else{
            this.setState({open1: true});
        }
    };

    panTwoHandler = () =>{
        if(this.state.open2){
            this.setState({open2: false});
        }
        else{
            this.setState({open2: true});
        }
    };
    choiceHandler = () => {
        const bankChoice = document.getElementById("bankChoice");
        bankChoice.style.display = 'none';
        const accountChoice = document.getElementById("accountChoice");
        accountChoice.style.display = 'block';
    }
    previousHanlder = () => {
        const bankChoice = document.getElementById("bankChoice");
        bankChoice.style.display = 'block';
        const accountChoice = document.getElementById("accountChoice");
        accountChoice.style.display = 'none';
    }
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Navigation nav={navInfo2}/>
                <Search/>
                <Container>
                    <InnerNavigationBar active={activeElement}/>

                    <div className={classes.root}>
                        <Typography variant="h4">Make a Transfer</Typography>
                        <Typography variant="h6">This is the transfer page</Typography>
                        <Typography variant="h6">Select the account that transfer from and the account transfer
                            to</Typography>
                        <br/>
                        <br/>
                        <div id="bankChoice" className={classes.paper}>
                            <Paper className={classes.innerPaper} style={{float: 'left'}}>
                                <button onClick={this.choiceHandler} style={{marginTop: '80px'}}>Chase Bank Card Transfer</button>
                            </Paper>
                            <Paper  className={classes.innerPaper}  style={{float: 'right'}}>
                                <button onClick={this.choiceHandler} style={{marginTop: '80px'}}>Other Bank Card Transfer</button>
                            </Paper>
                        </div>
                        <div id="accountChoice" style={{display:'none', margin: 'auto'}}>
                            <Typography variant="h6">Transfer from</Typography>
                            <ExpansionPanel expanded={this.state.open1}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} onClick={this.panOneHandler}>
                                    <Typography
                                        className={classes.heading}
                                        id="firstLabel"
                                    >Select Account</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails onClick={this.selectAccountOne}>
                                    <Button className={classes.button} conClick={this.selectAccount}>Checking Account
                                        -2644</Button>
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails onClick={this.selectAccountOne}>
                                    <Button className={classes.button}>Saving Account -9642</Button>
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails onClick={this.selectAccountOne}>
                                    <Button className={classes.button}>SJSP Platinum Visa Card -5544</Button>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <Typography variant="h6">Transfer to</Typography>
                            <ExpansionPanel expanded={this.state.open2}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>} onClick={this.panTwoHandler}>
                                    <Typography
                                        className={classes.heading}
                                        id="secondLabel"
                                    >Select Account</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails onClick={this.selectAccountTwo}>
                                    <Button className={classes.button}>Checking Account -2644</Button>
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails onClick={this.selectAccountTwo}>
                                    <Button className={classes.button}>Saving Account -9642</Button>
                                </ExpansionPanelDetails>
                                <ExpansionPanelDetails onClick={this.selectAccountTwo}>
                                    <Button className={classes.button}>SJSP Platinum Visa Card -5544</Button>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <br/>
                            <div>
                            <Typography variant="h6" style={{float: 'left', width:'30%', marginLeft: '200px'}}>Amount:  $</Typography>
                                <div style={{float: 'right', width:'10%', marginRight: '280px'}}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="amount"
                                        placeholder= {this.state.transferAmount}
                                    />
                                </div>
                            </div>
                            <br/>
                            <div>
                                <Button variant="contained" color="primary"
                                    className={classes.button}
                                    onClick={this.previousHanlder}
                                    style={{marginLeft: '250px', width: '15%', float: 'left'}}
                                >
                                    Previous
                                </Button>
                                <Button variant="contained" color="primary"
                                    className={classes.button}
                                    onClick={this.handleOpen}
                                    style={{marginRight: '250px', width: '15%', float: 'right'}}>
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

const activeElement = {
    act1: "nav-link ",
    act2: "nav-link ",
    act3: "nav-link active",
    act4: "nav-link ",
}
Transfer.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Transfer);
