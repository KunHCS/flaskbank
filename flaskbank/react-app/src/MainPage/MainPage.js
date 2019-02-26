import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Navigation from "./Navigation";
import Search from "./Search";
import Container from "./Container";

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});
const mainPage = (props) => {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item xs={12}>
                    <Navigation/>
                </Grid>
                <Grid item xs={12}>
                    <Search/>
                </Grid>
                <Grid item xs={12}>
                    <Container/>
                </Grid>
            </Grid>
        </div>

    );
}
mainPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(mainPage);
