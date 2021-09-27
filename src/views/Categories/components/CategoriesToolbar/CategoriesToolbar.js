import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput} from 'components';
import {connect} from "react-redux";
import { openDialog} from "../../../../redux/actions/ui.actions";
import SnackbarCustom
  from "../../../../components/SnackbarCustom/SnackbarCustom";

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
  }
}));

const CategoriesToolbar = props => {
  const { className, handleOpenDialog, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <SnackbarCustom />
      <div className={classes.row}>
        <SearchInput
            className={classes.searchInput}
            placeholder="Search product"
        />
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={handleOpenDialog}
        >
          Add category
        </Button>
      </div>
    </div>
  );
};

CategoriesToolbar.propTypes = {
  className: PropTypes.string
};

const mapDispatchToProps = (dispatch) => ({
  handleOpenDialog: () => {
    dispatch(openDialog(undefined));
  }
});

export default connect(null, mapDispatchToProps)(CategoriesToolbar)
