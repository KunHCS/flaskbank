import React from "react";
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import AddAccount from "../../../components/AddAccount/AddAccount";
import Modal from '@material-ui/core/Modal';
import {connect} from "react-redux";
import {openPopWindow1,openPopWindow2,closePopWindow} from "../../../actions/PopWindowStateAction/popWindowStateAction";
import RemoveSingleAccount from "../../../components/RemoveSingleAccount/RemoveSingleAccount";



class AddAccountBar extends React.Component {

    render() {
        console.log(this.props);
        return (
            <Paper style={navbarStyle}>
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link " to="/overview" onClick={this.props.openPopWindow1} > Add Account</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link " to="/overview" onClick={this.props.openPopWindow2} > Close Account</Link>
                    </li>
                </ul>
                <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
                       open={this.props.popWindowState.state1 }  onClose={this.props.closePopWindow}>
                    <AddAccount/>
                </Modal>

                <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
                       open={this.props.popWindowState.state2}  onClose={this.props.closePopWindow}>
                    <RemoveSingleAccount/>
                </Modal>
            </Paper>
        );
    }
}
//"nav-link active"//

const navbarStyle = {
    height: "auto",
    width:  500,
    boxShadow: '-2px 5px 25px, 2px 5px 25px',
    margin: '20px'

};


const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state;
}


export default connect(mapStateToProps,{openPopWindow1, openPopWindow2, closePopWindow})(AddAccountBar);