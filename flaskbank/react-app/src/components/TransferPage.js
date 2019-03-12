import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Navigation from "./FrameWorkUnity/DynamicNavBar";
import Search from "./FrameWorkUnity/Search";
import Container from "./FrameWorkUnity/Container";
import Paper from '@material-ui/core/Paper';
import InnerNavigationBar from "./FrameWorkUnity/StaticNavBar"
import {navInfo2} from "./FrameWorkUnity/NavDetails";
import PropTypes from "prop-types";

const TransferDetails= () => {
    return (
        <Paper  style={TransferDetailsStyle}>
            <div style={{margin:'20px'}}>
             Transfer Page
            </div>
        </Paper>
    );
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        width: 300,
    },
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

class Transfer extends React.Component{
    // state = {
    //
    // };
    // selectAccount = () =>{
    //     const labelFrom = document.getElementById('accountFrom');
    //     labelFrom.innerHTML = ;
    // };

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
                        <Typography variant="h6">Transfer from</Typography>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography className={classes.heading} id="accountFrom">Select Account</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Button className={classes.button} conClick={this.selectAccount}>Checking Account
                                    -2644</Button>
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails>
                                <Button className={classes.button}>Saving Account -9642</Button>
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails>
                                <Button className={classes.button}>SJSP Platinum Visa Card -5544</Button>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <Typography variant="h6">Transfer to</Typography>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography className={classes.heading} id="accountTo">Select Account</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Button className={classes.button}>Checking Account -2644</Button>
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails>
                                <Button className={classes.button}>Saving Account -9642</Button>
                            </ExpansionPanelDetails>
                            <ExpansionPanelDetails>
                                <Button className={classes.button}>SJSP Platinum Visa Card -5544</Button>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <br/>
                        <Button variant="contained" color="primary" className={classes.button}>
                            Next
                        </Button>
                    </div>
                    {/*<Statement/>*/}
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



const TransferDetailsStyle = {
    height: "auto",
    width:  500,

    boxShadow: '-2px 5px 25px, 2px 5px 25px',
    margin: '20px'
}
Transfer.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Transfer);
