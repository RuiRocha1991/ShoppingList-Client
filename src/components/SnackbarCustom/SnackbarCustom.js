import React from 'react';
import { connect } from 'react-redux';
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';

import { closeErrorMessage } from '../../redux/actions/ui.actions';
import clsx from "clsx";
import {makeStyles} from "@material-ui/styles";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles(theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}));
const MySnackbarContent = (props) => {
  const { className, message, onClose, variant, ...other } = props;
  const classes = useStyles();
  const Icon = variantIcon[variant];

  return (
      <SnackbarContent
          className={clsx(classes[variant], className)}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
              {message}
        </span>
          }
          action={[
            <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={onClose}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
          {...other}
      />
  );
}
const SnackbarCustom = ({ info, handleCloseInfoBox }) => {
  const action = (
      <React.Fragment>
        <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseInfoBox}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
  );
  return (

      <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={info.isOpen}
          autoHideDuration={6000}
          onClose={handleCloseInfoBox}
      >
        <MySnackbarContent
            onClose={handleCloseInfoBox}
            variant={info.type}
            message={info.message}
        />
      </Snackbar>
  )
};

const mapStateToProps = (state) => ({
  info: state.ui.info
})

const mapDispatchToProps = (dispatch) => ({
  handleCloseInfoBox: () => {
    dispatch(closeErrorMessage());
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarCustom);