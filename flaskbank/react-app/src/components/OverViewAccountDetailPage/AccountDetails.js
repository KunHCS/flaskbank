import React from 'react';
import PropTypes from "prop-types";
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import InnerNavigationBar from "../FrameWorkUnity/StaticNavBar"
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import * as ACTION from "../../static/action_type";


class AccountDetails extends React.Component {

    state = {
        myCurrentAccount: "",
    };

    componentDidMount() {
        this.setState({myCurrentAccount: this.props.myDetail})
    }


    renderList() {
        return this.state.myCurrentAccount.transactions.map(post => {
            return (
                <div className="item" key={post.time}>
                    <i className="large left aligned icon user"/>
                    <div className="content">
                        <div className="description">
                            <body style={{textAlign: 'center'}}><strong>Amount: </strong> {post.amount} | <span/>
                            <strong>Type: </strong>{post.description} | <span/>
                            <strong>Time: </strong>{post.time}</body>
                        </div>
                    </div>
                </div>
            );
        });

    }

    render() {
        console.log("I am in AccountDetails");
        console.log(this.props.myDetail);
        console.log(this.state.myCurrentAccount);


        if ((this.state.myCurrentAccount !== "" && this.props.userType == ACTION.CLIENT)) {
            return (
                <div>
                    <Navigation/>
                    <Search/>
                    <Container>
                        <InnerNavigationBar active={activeElement}/>
                        <Paper className="paper" style={detailStyle}>
                            <h3>{this.state.myCurrentAccount.alias} Details </h3>
                            <div>
                                {this.renderList()}
                            </div>
                        </Paper>
                    </Container>

                </div>
            );
        } else if ((this.state.myCurrentAccount !== "" && this.props.userType === ACTION.MANAGER)) {
            return (
                <div>
                    <Navigation/>
                    <Search/>
                    <Container>
                        <InnerNavigationBar active={activeElement}/>
                        <Paper className="paper" style={detailStyle}>
                            <h1>{this.state.myCurrentAccount.alias} Details </h1>
                            <div>
                                {this.renderList()}
                            </div>
                        </Paper>
                    </Container>

                </div>
            );
        } else {
            return (<div/>);
        }


    }


}

const activeElement = {
    act1: "nav-link ",
    act2: "nav-link ",
    act3: "nav-link ",
    act4: "nav-link ",
}


const detailStyle = {
    height: 'auto',
    width: '100%',
    fontWeight: 'bold',
    WebkitBorderRadius: '10px 10px 10px 10px',
    textAlign: 'center',
    font: 'Helvetica',
    margin: 'auto',

};

AccountDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state;
}


export default connect(mapStateToProps)(AccountDetails);
