import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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



class Transfer extends React.Component{

    render() {
        const {classes} = this.props;
        console.log("I am in Transfer Page")

        return (
            <div>
                <Navigation/>
                <Search/>
                <Container>
                    <InnerNavigationBar active={activeElement}/>

                    <div className={classes.root}>
                            <Paper className={classes.innerPaper} style={{position: 'flex'}}>
                                <br/>
                                <Typography variant="h4" color = "secondary" ><strong>Make a Transfer</strong></Typography>
                                <Typography variant="subtitle2">
                                    This is the transfer page. Select the account
                                    that you want to transfer from and the account
                                    you want to transfer to.
                                </Typography>
                                <br/>

                                <button onClick={() => this.props.history.push('/transfer/innerTransfer')}>
                                    Account Transfer to/from Internal Accounts
                                </button>
                                <br/>  <br/>
                                <button onClick={() => this.props.history.push('/transfer/outerTransfer')}>
                                    Account Transfer to/from External Accounts
                                </button>
                            </Paper>
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

Transfer.propTypes = {
    classes: PropTypes.object.isRequired,
};




export default withStyles(styles)(Transfer);
