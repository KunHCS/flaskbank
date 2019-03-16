import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Radio from '@material-ui/core/Radio';
import Navigation from "./FrameWorkUnity/DynamicNavBar";
import Search from "./FrameWorkUnity/Search";
import Container from "./FrameWorkUnity/Container";
import InnerNavigationBar from "./FrameWorkUnity/StaticNavBar"
import {navInfo2} from "./FrameWorkUnity/NavDetails";
import PropTypes from "prop-types";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        width: 300,
    },
    root: {
        width: '100%',
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

class Transfer extends React.Component{
    state = {
        open1: false,
        open2: false,
        open3: false,
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

    handleOpen = () => {
        this.setState({ open3: true });
    };

    handleClose = () => {
        this.setState({ open3: false });
    };
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
                        <Button variant="contained" color="primary"
                                className={classes.button}
                                onClick={this.handleOpen}>
                            Next
                        </Button>
                    </div>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.open3}
                        onClose={this.handleClose}
                    >
                        <div  className={classes.paper} style={getModalStyle()}>
                            <Radio
                                checked={this.state.selectedValue === 'd'}
                                onChange={this.handleChange}
                                value="d"
                                color="default"
                                name="radio-button-demo"
                                aria-label="D"
                            />
                        </div>
                    </Modal>
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
