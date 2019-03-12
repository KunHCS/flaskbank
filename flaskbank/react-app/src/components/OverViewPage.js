import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Navigation from "./FrameWorkUnity/DynamicNavBar";
import Search from "./FrameWorkUnity/Search";
import Container from "./FrameWorkUnity/Container";
//import Paper from '@material-ui/core/Paper';
import InnerNavigationBar from "./FrameWorkUnity/StaticNavBar"
import {navInfo2} from "./FrameWorkUnity/NavDetails";
import {connect} from "react-redux";

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});
// const Statement= () => {
//     return (
//         {/*<Paper  style={StatementStyle}>*/}
//             {/*<div style={innerRowStyle}>*/}
//              {/*Checking Account -2644*/}
//             {/*</div>*/}
//
//             {/*<div style={innerRowStyle}>*/}
//               {/*Saving Account -9642*/}
//             {/*</div>*/}
//
//             {/*<div style={innerRowStyle}>*/}
//                 {/*SJSP Platinum Visa Card -5544*/}
//             {/*</div>*/}
//         {/*</Paper>*/}
//
//     );
// }

function OverViewPage (props){
    const { classes } = props;
    return (
        <div >
            <Navigation nav = {navInfo2}/>
            <Search/>
            <Container>
                <InnerNavigationBar active ={activeElement}/>
                <div className={classes.root}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Checking Account -2644</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Saving Account -9642</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>SJSP Platinum Visa Card -5544</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                sit amet blandit leo lobortis eget.
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
                {/*<Statement/>*/}
            </Container>
        </div>

    );
}

const activeElement = {
    act1: "nav-link active",
    act2: "nav-link ",
    act3: "nav-link ",
    act4: "nav-link ",
}

const StatementStyle = {
    height: 350,
    width:  600,
    boxShadow: '-2px 5px 25px, 2px 5px 25px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'center',

}

const innerRowStyle= {
    backgroundColor: '#797979',
    height: 50,
    width:  400,
    margin: '20px',
    display: 'flex',
    textAlign: 'center',
    justifyContent:'center',
    alignItems: 'center',
}
OverViewPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

// export default withStyles(styles)(OverViewPage);

 const mapStateToProps = (state) => {
     console.log(state);
     return null //{song:state.songs};
 }

export default connect(mapStateToProps)(withStyles(styles)(OverViewPage));

