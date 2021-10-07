import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {Button, CircularProgress} from '@material-ui/core';

import {connect} from "react-redux";
import SnackbarCustom
  from "../../../../components/SnackbarCustom/SnackbarCustom";
import {openDialogToCreateShoppingList} from "../../../../redux/actions/shoppingList.actions";

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
  progress: {
    marginRight: theme.spacing(1)
  },
}));

const ShoppingListToolbar = props => {
  const { className, handleOpenDialog, categories, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <SnackbarCustom />
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={handleOpenDialog}
        >
          {categories.isFetching && <CircularProgress size={20} color='inherit' className={classes.progress} />} <span>Add List</span>
        </Button>
      </div>
    </div>
  );
};

ShoppingListToolbar.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = (state) => ({
  categories: state.shoppingList.categories,
})

const mapDispatchToProps = (dispatch) => ({
  handleOpenDialog: () => {
    dispatch(openDialogToCreateShoppingList());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListToolbar)
