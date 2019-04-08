import React from 'react';
import PropTypes from "prop-types";
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import InnerNavigationBar from "../FrameWorkUnity/StaticNavBar"
import {connect} from "react-redux";
import Button from '@material-ui/core/Button';
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import * as ACTION from "../../static/action_type";



class AccountDetails extends React.Component{

    state={
        myCurrentAccount : "",
    };

    componentDidMount() {
        switch(this.props.myDetail) {
            case ACTION.CHECKING_DETAIL : this.setState({myCurrentAccount : this.props.myInfo.accounts[0]} )
                break;
            case ACTION.SAVING_DETAIL   : this.setState({myCurrentAccount : this.props.myInfo.accounts[1]} )
                break;
            case ACTION.CREDIT_DETAIL   : this.setState({myCurrentAccount : this.props.myInfo.accounts[2]} )
                break;
            default : this.setState({myCurrentAccount : null} )
        }

    }


    renderList() {
        return this.state.myCurrentAccount.transactions.map(post =>{
            return (
                <div className ="item" key={post.time}>
                    <i className="large left aligned icon user"/>
                    <div className ="content">
                        <div className="description">
                            <h4>Amount: {post.amount} | <span/>
                             Type: {post.description} | <span/>
                             Time:  {post.time}</h4>
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

        if (this.state.myCurrentAccount !== "") {
            return (
                <div>
                    <Navigation/>
                    <Search/>
                    <Container>
                        <InnerNavigationBar active={activeElement}/>
                        <Paper className="paper" style={detailStyle}>
                            {this.state.myCurrentAccount.alias} Details
                            {/*{this.renderList()}*/}
                        </Paper>
                    </Container>

                </div>

            );
        }
        else if ( (this.state.myCurrentAccount !== "")) {return (
            <div>
                <Navigation/>
                <Search/>
                <Container>
                    <InnerNavigationBar active={activeElement}/>
                    <Paper className="paper" style={detailStyle}>
                        {this.state.myCurrentAccount.alias} Details
                        {this.renderList()}
                    </Paper>
                </Container>

            </div>
        );};
    }


}

const activeElement = {
    act1: "nav-link ",
    act2: "nav-link ",
    act3: "nav-link ",
    act4: "nav-link ",
}


const detailStyle = {
    height: '80%',
    width:  '100%',
    fontWeight: 'bold',
    WebkitBorderRadius:'10px 10px 10px 10px',
    textAlign:'center',
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
