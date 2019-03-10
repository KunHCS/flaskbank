import React from 'react';
import Navigation from "./FrameWorkUnity/DynamicNavBar";
import Search from "./FrameWorkUnity/Search";
import Container from "./FrameWorkUnity/Container";
import Paper from '@material-ui/core/Paper';
import {navInfo1} from "./FrameWorkUnity/NavDetails";



const CloseAccountPage = () => {
    return (
        <div >
            <Navigation nav = {navInfo1}/>
            <Search/>
            <Container>
                <CloseAccountDetails/>
            </Container>
        </div>

    );
}


class CloseAccountDetails extends React.Component {

    render(){
        return (
            <div>
                <Paper className ="paper" style={paperStyle} >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mt-5 mx-auto">
                                <form noValidate onSubmit={this.onSubmit}>
                                    <h1 className="h3 mb-3 font-weight-normal">Close Account</h1>

                                    <div className="form-group">
                                        <label htmlFor="name">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            placeholder="Enter your user name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            placeholder="Enter email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            placeholder="Password"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-primary btn-block"
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>
        )
    };
}



const paperStyle = {
    height: 600,
    width:  500,
    boxShadow: '-5px 1px 10px, 5px 1px 10px',
};
export default CloseAccountPage;
