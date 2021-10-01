import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';
import {
  openItemsDialog
} from "../../../../redux/actions/ui.actions";
import {connect} from "react-redux";

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
    marginRight: theme.spacing(1)
  }
}));

const ItemsToolbar = props => {
  const { className, handleOpenDialog, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <SearchInput
            className={classes.searchInput}
            placeholder="Search user"
        />
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={handleOpenDialog}
        >
          Add Item
        </Button>
      </div>
    </div>
  );
};

ItemsToolbar.propTypes = {
  className: PropTypes.string
};

const mapDispatchToProps = (dispatch) => ({
  handleOpenDialog: () => {
    dispatch(openItemsDialog(undefined));
  }
});

export default connect(null, mapDispatchToProps)(ItemsToolbar)
