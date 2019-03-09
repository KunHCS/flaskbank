import React from 'react';
import Navigation from "./Navigation";
import Search from "./Search";
import Container from "./Container";
import Paper from '@material-ui/core/Paper';




const Nav =()=> {
   return (
       <Paper style ={navbarStyle}>
       <ul className="nav nav-pills nav-fill">
           <li className="nav-item">
               <a className="nav-link" href="#">Account Balance</a>
           </li>
           <li className="nav-item">
               <a className="nav-link" href="#">Bill Pay</a>
           </li>
           <li className="nav-item">
               <a className="nav-link" href="#">Transfer</a>
           </li>
           <li className="nav-item">
               <a className="nav-link " href="#">Deposit</a>
           </li>
       </ul>
       </Paper>
    );
}

const Checking= () => {
    return (
        <Paper  style={checkingContainerStyle}>
            <div style={{margin:'20px'}}>
             Checking Account -2644
            </div>

            <div style={{margin:'20px'}}>
              Saving Account -9642
            </div>

            <div style={{margin:'20px'}}>
                SJSP Platinum Visa Card -5544
            </div>
        </Paper>
    );
}

const OverView = () => {

    return (
        <div >
            <Navigation/>
            <Search/>
            <Container>
                <Nav/>
                <Checking/>
            </Container>
        </div>

    );
}

const navbarStyle = {
    height: "auto",
    width:  500,
    boxShadow: '-2px 5px 25px, 2px 5px 25px',
    margin: '20px'

};

const checkingContainerStyle = {
    height: "auto",
    width:  500,

    boxShadow: '-2px 5px 25px, 2px 5px 25px',
    margin: '20px'
}

export default OverView;