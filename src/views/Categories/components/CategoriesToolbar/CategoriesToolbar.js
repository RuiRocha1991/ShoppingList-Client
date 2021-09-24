import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput} from 'components';
import {CreateEditCategoryDialog} from './components'
import {connect} from "react-redux";
import {closeDialog, openDialog} from "../../../../redux/actions/ui.actions";
import {createCategory} from "../../../../redux/actions/category.actions";
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
  const { className, handleSaveChanges, dialogConfig, handleOpenDialog, handleCloseDialog, isFetching, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <SnackbarCustom />
      {dialogConfig && dialogConfig.isOpen && (<CreateEditCategoryDialog
          handleClose={handleCloseDialog}
          handleSave={handleSaveChanges}
          openDialog={dialogConfig.isOpen}
          isFetching={isFetching}
      />)}
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

const mapStateToProps = (state) => ({
  dialogConfig: state.ui.dialog,
  isFetching: state.ui.isFetching
})

const mapDispatchToProps = (dispatch) => ({
  handleSaveChanges: (newFormValues, category) => {
    let newCategory;
    if (category) {
      newCategory = {
        ...category,
      }
      dispatch(() => console.log("edit category"));
    } else {
      dispatch(createCategory(newFormValues));
    }

  },
  handleOpenDialog: () => {
    dispatch(openDialog(undefined));
  },
  handleCloseDialog: () => {
    dispatch(closeDialog());
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesToolbar)
