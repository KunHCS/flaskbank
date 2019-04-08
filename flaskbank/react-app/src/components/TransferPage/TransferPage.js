import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import InnerNavigationBar from "../FrameWorkUnity/StaticNavBar"
import PropTypes from "prop-types";
import {connect} from "react-redux";



class Transfer extends React.Component{
    state = {
        open1: false,
        open2: false,
        transferAmount: 500,
        checkingAccount : "",
        savingAccount: "",
        creditAccount: "",
    };


    componentDidMount() {
        this.setState({checkingAccount:  this.props.myInfo.accounts[0]})
        this.setState({savingAccount:    this.props.myInfo.accounts[1]})
        this.setState({creditAccount:    this.props.myInfo.accounts[2]})
    }


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
                <Navigation/>
                <Search/>
                <Container>
                    <InnerNavigationBar active={activeElement}/>

                    <div className={classes.root}>
                        <div id="bankChoice">
                            <Paper className={classes.innerPaper} style={{position: 'flex'}}>
                                <br/>
                                <Typography variant="h4" color = "secondary" ><strong>Make a Transfer</strong></Typography>
                                <Typography variant="subtitle2">This is the transfer page. Select the account that you want to transfer from and the account you want to transfer
                                    to.</Typography>
                                <br/>
                                <button onClick={this.choiceHandler}>Chase Bank Card Transfer</button>
                                <br/>
                                <br/>
                                <button onClick={this.choiceHandler}>Other Bank(s) Card Transfer</button>
                            </Paper>
                        </div>
                        <div id="accountChoice" style={{display:'none', margin: 'auto'}}>
                            <Paper className={classes.innerPaper2} style={{position: 'flex'}}>
                                <br/>
                            <Typography variant="h6" color = "secondary"><strong>Transfer From:</strong></Typography>
                                <br/>
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
                                <br/>
                            <Typography variant="h6" color = "secondary"><strong>Transfer To:</strong></Typography>
                                <br/>
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

                                <div style={{float: 'right', width:'10%', marginRight: '280px'}}>
                                    <Typography variant="h6" style={{float: 'left', width:'30%', marginLeft: '200px'}}>Amount: $</Typography>
                                    <input
                                        type="text"
                                        className={classes.button}
                                        name="amount"
                                        placeholder= {this.state.transferAmount}
                                    />
                                </div>
                            </div>
                            <br/>
                            <div>
                                <br/>
                                <Button variant="contained" color="primary"
                                    className={classes.button}
                                    onClick={this.previousHanlder}
                                    //style={{marginLeft: '250px', width: '15%', float: 'left'}}
                                >
                                    Previous
                                </Button>
                                <Button variant="contained" color="primary"
                                    className={classes.button}
                                    onClick={this.handleOpen}
                                    //style={{marginRight: '250px', width: '15%', float: 'right'}}>
                                   > Next
                                </Button>
                            </div>
                            </Paper>
                        </div>
                    </div>
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
        height: theme.spacing.unit * 35,
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

Transfer.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state;
}



export default connect(mapStateToProps)(withStyles(styles)(Transfer));
