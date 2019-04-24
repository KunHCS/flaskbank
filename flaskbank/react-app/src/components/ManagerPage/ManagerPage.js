import React from "react";
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import {Link, Redirect} from "react-router-dom";
import Container from "../FrameWorkUnity/Container";
import Search from "../FrameWorkUnity/Search";
import axios from "axios";
import {connect} from "react-redux";
import { getProfile } from "../../actions/GetProfileAction/getProfileAction";
import * as ACTION from "../../static/action_type";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {accountDetailAction} from "../../actions/AccountDetailsAction/accountDetailsAction";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";



class ManagerPage extends React.Component {

    componentDidMount() {
        console.log(" ManagerPage Component Did Mount")
        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}

        axios.get("/api/client/all",{headers: req_headers})
            .then(response => {
                console.log(response);
                this.props.getProfile(response.data);
            }).catch (error => console.log(error.response.data.msg));
    }

    renderAccount() {
        const { classes } = this.props;
        if (this.props.myInfo !== " ") {
            return this.props.myInfo.accounts.map(account => {
                return (
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography
                                className={classes.heading}><strong> {account.alias} : {account.account_number} -- (Account Type: {account.type})</strong>
                            </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div style={{width: '90%'}}>
                                <Typography style={{float: 'left'}}>
                                    Balance: ${account.balance}
                                </Typography>
                                <Link to="/overview/account_detail"
                                      onClick={() => this.props.accountDetailAction(account)}>
                                    <Button style={{float: 'right'}} variant="outlined" size="medium" color="primary"
                                            className={classes.margin}>Transactions</Button>
                                </Link>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                );
            });
        }else { return (<div/>);}

    }

    render() {
        console.log(this.props);
            return (
                <div>
                    <Navigation/>
                    <Search/>
                    <Container>
                        {this.renderAccount()}
                    </Container>
                </div>
            );
        }

}


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


ManagerPage.propTypes = {
    classes: PropTypes.object.isRequired,
};



const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state;
}

export default connect(mapStateToProps,{ getProfile ,accountDetailAction})(withStyles(styles)(ManagerPage));
