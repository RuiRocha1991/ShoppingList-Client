import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  Typography, CircularProgress, Snackbar, IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { Google as GoogleIcon } from 'icons';
import GoogleLogin from 'react-google-login';
import {
  googleAuthSignInFailure,
  googleAuthSignInSuccess
} from "../../redux/actions/user.actions";
import {closeErrorMessage} from "../../redux/actions/ui.actions";



const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('md')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  socialArea: {
    margin:'auto'
  }

}));

const SignIn = ({handleSignInSuccess, handleSignInFailure, isFetching, error, handleCloseErrorMessage}) => {
  const classes = useStyles();
  const action = (
      <React.Fragment>
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseErrorMessage}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
  );
  return (
    <div className={classes.root}>
      <Snackbar
          autoHideDuration={6000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={error.isOpen}
          onClose={handleCloseErrorMessage}
          message={error.message}
          action={action}
      >
      </Snackbar>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={7}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >

              </Typography>
              <div>
                <Typography
                  className={classes.name}
                  variant="body1"
                >

                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >

                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={5}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                  align="center"
                >
                  Sign in
                </Typography>
                <Typography
                  color="textSecondary"
                  align="center"
                  gutterBottom
                >
                  Sign in with social media
                </Typography>
                <Grid
                  className={classes.socialButtons}
                  container
                  spacing={2}
                >
                  <Grid item className={classes.socialArea}>
                    <GoogleLogin
                      render={renderProps => (
                        <Button
                          onClick={renderProps.onClick}
                          size="large"
                          variant="contained"
                        >
                          {!isFetching && <GoogleIcon className={classes.socialIcon} />}
                          {isFetching && <CircularProgress size={20} color='inherit' className={classes.socialIcon} />}
                          Login with Google
                        </Button>)}
                      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                      buttonText="Login"
                      onSuccess={handleSignInSuccess}
                      onFailure={handleSignInFailure}
                      cookiePolicy={'single_host_origin'}
                    />
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLogged: state.user.isAuthenticated,
  isFetching: state.ui.isFetching,
  error: state.ui.error
})

const mapDispatchToProps = (dispatch) => ({
  handleSignInSuccess: (response) => {
    dispatch(googleAuthSignInSuccess(response));
  },
  handleSignInFailure:(response) => {
    dispatch(googleAuthSignInFailure(response));
  },
  handleCloseErrorMessage: () => {
    dispatch(closeErrorMessage());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
