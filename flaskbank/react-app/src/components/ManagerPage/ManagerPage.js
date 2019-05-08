import React from "react";
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import {Link, Redirect} from "react-router-dom";
import Container from "../FrameWorkUnity/Container";
import Search from "../FrameWorkUnity/Search";
import axios from "axios";
import {connect} from "react-redux";
import {getProfile} from "../../actions/GetProfileAction/getProfileAction";
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
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase";
import {fade} from "@material-ui/core/styles/colorManipulator";
import Paper from '@material-ui/core/Paper';
import {saveQueryResult, cleanQueryResult} from "../../actions/ManagerQueryAction/ManagerQueryAction";
import {getClientsInfo, cleanClientsInfo} from "../../actions/ClientsInfoAction/ClientsInfoAction";


class ManagerPage extends React.Component {

    state = {
        value: 'email',
        search_value: "",
        flag: false,
    };

    componentDidMount() {
        console.log(" ManagerPage Component Did Mount")
        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}

        axios.get("api/manager/get", {headers: req_headers})
            .then(response => {
                console.log(response);
                this.props.getClientsInfo(response.data);
            }).catch(error => console.log(error.response.data.msg));

        axios.get("/api/client/all", {headers: req_headers})
            .then(response => {
                console.log(response);
                this.props.getProfile(response.data);
            }).catch(error => console.log(error.response.data.msg));
    }

    renderAccount() {
        const {classes} = this.props;
        if (this.props.myClientsInfo !== " ") {
            return this.props.myClientsInfo.results.map(result => {
                return (
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography
                                className={classes.heading}><strong> {result.first_name} {result.last_name} </strong>
                            </Typography>
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails>
                            <div style={{width: '90%'}}>
                                <Typography>
                                    <strong>Email: </strong>{result.email}
                                    <hr/>
                                    <strong>Username: </strong>{result.username}
                                </Typography>

                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                );
            });
        } else {
            return (<div/>);
        }

    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("I submit")

        const req_headers = {Authorization: 'Bearer ' + this.props.myKey}

        axios.get('/api/manager/query/' + this.state.value + '/' + this.state.search_value,
            {headers: req_headers}
        )
            .then(response => {
                console.log(response);
                console.log(response.data.results.length)
                if (response.data.results.length == 0) {
                    this.props.cleanQueryResult();
                    alert("Nothing Found");
                } else {
                    this.props.saveQueryResult(response.data.results);
                    this.setState({flag: true})
                }

            }).catch(error => {
            alert("Query Failed---");// + (error.response.data.msg));
            console.log(error.response.data.msg);
        });

        this.setState({search_value: ""});

    }


    render() {
        console.log(this.props);
        console.log(this.state.value);
        console.log(this.state.search_value);
        const {classes} = this.props;

        if (this.state.flag == true) {
            return (<Redirect to={'/manager/queryResult'}/>)
        }

        return (
            <div>
                <Navigation/>
                <Search/>
                <Container>

                    <Paper className="paper" style={detailStyle}>
                        <form onSubmit={this.onSubmit}>
                            <div className={classes.grow}/>
                            <div className="row">
                                <div className={classes.search}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon/>
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        value={this.state.search_value}
                                        minLength = "1"
                                        maxlength="50"
                                        onChange={e => this.setState({search_value: e.target.value})}/>
                                </div>
                                <Button type="submit" style={{visibility: "hidden"}}/>

                                <div><Typography variant="h8">Select Attribute to Query Information--></Typography></div>
                                <div>
                                    <select onChange={e => this.setState({value: e.target.value})}>
                                        <option value="email">Email</option>
                                        <option value="username">Username</option>
                                        <option value="first">First Name</option>
                                        <option value="last">Last Name</option>
                                        <option value="account">Account</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </Paper>


                    <hr/>
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

    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        padding: 10,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

const detailStyle = {
    height: 'auto',
    width: 'auto',
    fontWeight: 'bold',
    WebkitBorderRadius: '10px 10px 10px 10px',
    textAlign: 'center',
    font: 'Helvetica',
    margin: '10px',

};


ManagerPage.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state;
}

export default connect(mapStateToProps, {
    getProfile, accountDetailAction,
    saveQueryResult, cleanQueryResult,
    getClientsInfo, cleanClientsInfo
})(withStyles(styles)(ManagerPage));
