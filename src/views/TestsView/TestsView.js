import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';
import {connect} from "react-redux";
import {
  googleAuthSignInFailure,
  googleAuthSignInSuccess
} from "../../redux/actions/user.actions";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  content: {
    paddingTop: 150,
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const TestsView = ({state}) => {
  const classes = useStyles();

  return (
      <div className={classes.root}>
        <Grid
            container
            justify="center"
            spacing={4}
        >
          <Grid
              item
              lg={6}
              xs={12}
          >
            <div className={classes.content}>
              <Typography variant="h1">
                Welcome guys
              </Typography>
              <img
                  alt="Under development"
                  className={classes.image}
                  src="/images/maintenance/maintenance_3.gif"
              />
            </div>
          </Grid>
        </Grid>
      </div>
  );
};

const mapStateToProps = (state) => ({
  state: state,
})

const mapDispatchToProps = (dispatch) => ({
  handleSignInSuccess: (response) => {
    dispatch(googleAuthSignInSuccess(response));
  },
  handleSignInFailure:(response) => {
    dispatch(googleAuthSignInFailure(response));
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(TestsView);
