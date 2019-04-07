import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import {Link}from "react-router-dom";
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import InnerNavigationBar from "../FrameWorkUnity/StaticNavBar"
import {connect} from "react-redux";
import axios from "axios";
import { getProfile } from "../../actions/GetProfileAction/getProfileAction";


const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    margin: {
        margin: theme.spacing.unit,
    },
});

class OverViewPage extends React.Component{
    state={
        checkingBalance: 5987.79,
        savingBalance: 21568.23,
        creditBalance: 666.75,
        checkingAccount : "",
        savingAccount :" =",
    };


    componentDidMount() {
        console.log("OverVIew Component Did Mount")
        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}

        axios.get("/api/client/all",{headers: req_headers})
             .then(response => {
                console.log(response);
                this.props.getProfile(response.data);
                console.log(this.props.myInfo.accounts[0]);

                 this.setState({checkingAccount : this.props.myInfo.accounts[0]});
                 this.setState({savingAccount : this.props.myInfo.accounts[1]});


            }).catch (error => console.log(error.response.data.msg));


    }



    render() {
        const { classes } = this.props;
        console.log("I am in overview page");
        console.log(this.props.myInfo);
        console.log(this.state.checkingAccount);

        const cNumber =this.state.checkingAccount.account_number;
        const sNumber =this.state.savingAccount.account_number;
        const cBalance=this.state.checkingAccount.balance;
        const sBalance=this.state.savingAccount.balance;

        return (
            <div >
                <Navigation/>
                <Search/>
                <Container>
                    <InnerNavigationBar active ={activeElement}/>
                    <div className={classes.root}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}><strong>Checking Account - {cNumber}</strong></Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div style={{width: '90%'}}>
                                    <Typography style={{float: 'left'}}>
                                        Balance: $ {cBalance}
                                    </Typography>
                                    <Button style={{float: 'right'}} variant="outlined" size="medium" color="primary"
                                            className={classes.margin}>Transactions</Button>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}><strong>Saving Account - {sNumber}</strong></Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div style={{width: '90%'}}>
                                    <Typography style={{float: 'left'}}>
                                        Balance: $ {sBalance}
                                    </Typography>
                                    <Button style={{float: 'right'}} variant="outlined" size="medium" color="primary"
                                            className={classes.margin}>Transactions</Button>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}><strong>SJSP Platinum Visa Card -5544</strong></Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div style={{width: '90%'}}>
                                    <Typography style={{float: 'left'}}>
                                        Balance: $ {this.state.creditBalance}
                                    </Typography>
                                    <Button style={{float: 'right'}} variant="outlined" size="medium" color="primary"
                                            className={classes.margin}>Transactions</Button>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                </Container>
            </div>

        );
    }
}

const activeElement = {
    act1: "nav-link active",
    act2: "nav-link ",
    act3: "nav-link ",
    act4: "nav-link ",
}

OverViewPage.propTypes = {
    classes: PropTypes.object.isRequired,
};


 const mapStateToProps = (state) => {
     return state;
 }




export default connect(mapStateToProps,{getProfile}) (withStyles(styles)(OverViewPage));

