import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  LinearProgress,
  Box,
} from '@material-ui/core';
import {
  CategoriesToolbar,
  CreateEditCategoryDialog, CreateEditItemDialog,
  DeleteDialog, ItemTable
} from './components';

import { connect } from 'react-redux';
import { fetchAllCategories } from '../../redux/actions/category.actions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  processContent: {
    height: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  progress: {
    margin: '0 16px'
  },
  content: {
    marginTop: theme.spacing(2)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  hiddenColumns: {
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    }
  },
}));



const Items = ({onLoadPage, categories, isFetching, deleteDialog, categoryDialog, itemDialog}) => {
  const classes = useStyles();
  useEffect(() => {
    onLoadPage();
  }, []);

  return (
    <div className={classes.root}>
     <CategoriesToolbar/>
      <div className={classes.content}>
        {!deleteDialog.isOpen && !categoryDialog.isOpen && !itemDialog.isOpen && isFetching &&
        <Box component={'div'} boxShadow={3} className={classes.processContent} >
          <LinearProgress className={classes.progress}/>
        </Box>}
        {categoryDialog.isOpen && <CreateEditCategoryDialog />}
        {itemDialog.isOpen && <CreateEditItemDialog />}
        {deleteDialog.isOpen && <DeleteDialog />}
        {(!isFetching || (isFetching && (categoryDialog.isOpen || itemDialog.isOpen || deleteDialog.isOpen))) && <ItemTable categories={categories} />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isFetching: state.ui.isFetching,
  categories: state.category.categories,
  categoryDialog: state.category.dialogToCreateEditCategory,
  itemDialog: state.category.dialogToCreateEditItem,
  deleteDialog: state.category.dialogToDelete
})

const mapDispatchToProps = (dispatch) => ({
  onLoadPage: () => {
    dispatch(fetchAllCategories());
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Items);

