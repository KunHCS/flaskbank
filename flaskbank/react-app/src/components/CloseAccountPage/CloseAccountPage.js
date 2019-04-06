import React from 'react';
import Navigation from "../FrameWorkUnity/DynamicNavBar";
import Search from "../FrameWorkUnity/Search";
import Container from "../FrameWorkUnity/Container";
import Paper from '@material-ui/core/Paper';




const CloseAccountPage = () => {
    return (
        <div >
            <Navigation/>
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
                <Paper className ="paper" style={paperStyle} >
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 mt-5 mx-auto">
                                <form noValidate onSubmit={this.onSubmit}>
                                    <h1 className="h3 mb-3 font-weight-bold font-weight-normal">Close Account</h1>

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
                                        className="btn btn-lg btn-primary btn-block"> Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Paper>
        )
    };
}



const paperStyle = {
    height: '100%',
    width:  '100%',
    textAlign:'center',
    margin: 'auto',
    WebkitBorderRadius:'10px 10px 10px 10px',
    fontWeight: 'bold',
    font: 'Helvetica',
};
export default CloseAccountPage;
