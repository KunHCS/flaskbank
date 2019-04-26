import React from "react";
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import * as ACTION from "../../static/action_type";

class Nav extends React.Component {

    render() {

        if (this.props.userType == ACTION.CLIENT) {
            return (
                <Paper style={navbarStyle}>
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link className={this.props.active.act1} to="/overview">Account Balance</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={this.props.active.act2} to="/pay">Bill Pay</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={this.props.active.act3} to="/transfer">Transfer</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={this.props.active.act4} to="/deposit">Deposit</Link>
                        </li>
                    </ul>
                </Paper>
            );
        }

        else if (this.props.userType == ACTION.MANAGER) {
            return (
                <Paper style={navbarStyle}>
                    <ul className="nav nav-pills nav-fill">
                        <li className="nav-item">
                            <Link className={this.props.active.act1} to="/manager">Search</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={this.props.active.act2} to="/manager/queryResult">Result</Link>
                        </li>
                    </ul>
                </Paper>
            );
        }

    }


}


//"nav-link active"//

const navbarStyle = {
    height: "auto",
    width: 500,
    boxShadow: '-2px 5px 25px, 2px 5px 25px',
    margin: '20px'

};


const mapStateToProps = (state) => {
    console.log("I'm StativNavBar");
    console.log(state);
    return state;
}

export default connect(mapStateToProps)(Nav);