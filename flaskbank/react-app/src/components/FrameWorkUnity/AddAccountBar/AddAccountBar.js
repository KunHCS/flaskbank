import React from "react";
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import AddAccount from "../../../components/AddAccount/AddAccount";
import Modal from '@material-ui/core/Modal';
import {connect} from "react-redux";
import {openPopWindow, closePopWindow} from "../../../actions/PopWindowStateAction/popWindowStateAction";



class AddAccountBar extends React.Component {
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

        console.log(this.props);
        return (
            <Paper style={navbarStyle}>
                <ul className="nav nav-pills nav-fill">
                    <li className="nav-item">
                        <Link className="nav-link " to="/overview" onClick={this.props.openPopWindow} > Add Account</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link " to="/overview"> Close Account</Link>
                    </li>
                </ul>
                <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
                       open={this.props.popWindowState}  onClose={this.props.closePopWindow}>
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



const mapStateToProps = (state) => {
    console.log("I'm in map State to Props");
    console.log(state);
    return state;
}


export default connect(mapStateToProps,{openPopWindow, closePopWindow})(AddAccountBar);