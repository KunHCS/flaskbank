import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Navigation from "./FrameWorkUnity/DynamicNavBar";
import Search from "./FrameWorkUnity/Search";
import Container from "./FrameWorkUnity/Container";
import InnerNavigationBar from "./FrameWorkUnity/StaticNavBar"
import {navInfo2} from "./FrameWorkUnity/NavDetails";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        width: 'auto',
    },
    root: {
        width: '100%',
    },
    bgDiv: {
        position: 'absolute',
        outline: 'none',
        textAlign: 'center',
    },
    top:{
        marginLeft: theme.spacing.unit * 15,
        marginBottom: theme.spacing.unit * 5,
        width: theme.spacing.unit * 80,
        height:"50vh",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        textAlign: 'center',
    },
    bottom:{
        marginLeft: theme.spacing.unit * 15,
        marginBottom: theme.spacing.unit * 5,
        width: theme.spacing.unit * 80,
        height:"50vh",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        textAlign: 'center',
    }
});

class DepositPage extends React.Component{
    state = {
        payAmount: 500,
    };
    render() {
        const {classes} = this.props;
        return (
            <div >
                <Navigation nav = {navInfo2}/>
                <Search/>
                <Container>
                    <InnerNavigationBar active={activeElement}/>
                    <div className={classes.bgDiv}>
                        <div className={classes.top}>
                            <div style={{float: 'left', width:"50%"}}>
                                <Typography variant="h6" color="secondary">Deposit to checking account</Typography>
                                <Typography variant="subtitle2">Checking Account -2644</Typography>
                            </div>
                            <div style={{float: 'right', width:"30%"}}>
                                <Typography variant="h6">Amount</Typography>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="amount"
                                    placeholder= {'$' + this.state.payAmount}
                                />
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>

                        <div className={classes.bottom}>
                            <div style={{float: 'left', width:"50%"}}>
                                <Typography variant="h6" color="secondary">Deposit to saving account</Typography>
                                <Typography variant="subtitle2">Saving Account -9642</Typography>
                            </div>
                            <div style={{float: 'right', width:"30%"}}>
                                <Typography variant="h6">Amount</Typography>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="amount"
                                    placeholder= {'$' + this.state.payAmount}
                                />
                                <Button
                                    className={classes.button}
                                    variant="contained"
                                    color="primary"
                                >
                                    Submit
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
    act2: "nav-link active",
    act3: "nav-link ",
    act4: "nav-link ",
}

DepositPage.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(DepositPage);