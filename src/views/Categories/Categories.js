import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  LinearProgress,
  Box,
} from '@material-ui/core';
import {
  CategoriesToolbar,
  CategoryCard,
  CreateEditCategoryDialog,
  DeleteDialog
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
  }
}));

const Categories = ({onLoadPage, categories, isFetching, dialog, deleteDialog}) => {
  const classes = useStyles();
  useEffect(() => {
    onLoadPage();
  }, []);

  return (
    <div className={classes.root}>
     <CategoriesToolbar/>
      <div className={classes.content}>
        {!deleteDialog.isOpen && !dialog.isOpen && isFetching &&
        <Box component={'div'} boxShadow={3} className={classes.processContent} >
          <LinearProgress className={classes.progress}/>
        </Box>}
        {dialog.isOpen && <CreateEditCategoryDialog />}
        {deleteDialog.isOpen && <DeleteDialog />}
          <Grid
              container
              spacing={3}
          >
            {(!isFetching || (isFetching && (dialog.isOpen || deleteDialog.isOpen))) && categories.map(category => (
                <Grid
                    item
                    key={category._id}
                    lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                >
                  <CategoryCard category={category} />
                </Grid>
            ))}
          </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isFetching: state.ui.isFetching,
  dialog: state.ui.dialog,
  deleteDialog: state.ui.deleteDialog,
  categories: state.category.categories,
})

const mapDispatchToProps = (dispatch) => ({
  onLoadPage: () => {
    dispatch(fetchAllCategories());
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories);

