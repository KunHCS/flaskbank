import React from "react";
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import AddAccount from "../AddAccount/AddAccount";
import Modal from '@material-ui/core/Modal';

const Nav =(props)=> {
    return (
        <Paper style ={navbarStyle}>
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <Link className={props.active.act1} to="/overview">Account Balance</Link>
                </li>
                <li className="nav-item">
                    <Link className={props.active.act2} to="/pay">Bill Pay</Link>
                </li>
                <li className="nav-item">
                    <Link className={props.active.act3} to="/transfer">Transfer</Link>
                </li>
                <li className="nav-item">
                    <Link className={props.active.act4} to="/deposit">Deposit</Link>
                </li>
            </ul>
        </Paper>
    );
}


export class AddAccountBar extends React.Component {
    state = {
        open:false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <Paper style={navbarStyle}>
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link " to="#" onClick={this.handleOpen} > Add Account</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link " to="/overview"> Close Account</Link>
                    </li>
                </ul>
            <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
                   open={this.state.open}  onClose={this.handleClose}>
            <AddAccount/>
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

export default Nav;