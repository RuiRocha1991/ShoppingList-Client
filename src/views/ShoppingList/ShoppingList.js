import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  LinearProgress,
  Box,
} from '@material-ui/core';
import {
  CreateEditShoppingListDialog,
  DeleteDialog, ShoppingListCard, ShoppingListToolbar
} from './components';
import { connect } from 'react-redux';
import {fetchAllShoppingLists} from "../../redux/actions/shoppingList.actions";

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

const ShoppingList = ({onLoadPage, shoppingLists, isFetching, dialogToCreateEdit, deleteDialog}) => {
  const classes = useStyles();
  useEffect(() => {
    onLoadPage();
  }, []);

  return (
    <div className={classes.root}>
     <ShoppingListToolbar />
      <div className={classes.content}>
        {isFetching && !dialogToCreateEdit.isOpen && !deleteDialog.isOpen &&
        <Box component={'div'} boxShadow={3} className={classes.processContent} >
          <LinearProgress className={classes.progress}/>
        </Box>}
        {dialogToCreateEdit.isOpen && <CreateEditShoppingListDialog />}
        {deleteDialog.isOpen && <DeleteDialog />}
        {<DeleteDialog />}
          <Grid
              container
              spacing={3}
          >
            {(!isFetching || (isFetching && (dialogToCreateEdit.isOpen || deleteDialog.isOpen ))) && shoppingLists.map(shoppingList => (
                <Grid
                    item
                    key={shoppingList._id}
                    lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                >
                  <ShoppingListCard shoppingList={shoppingList} />
                </Grid>
            ))}
          </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isFetching: state.ui.isFetching,
  shoppingLists: state.shoppingList.shoppingLists,
  dialogToCreateEdit: state.shoppingList.dialogToCreateEditList,
  deleteDialog: state.shoppingList.deleteDialog
})

const mapDispatchToProps = (dispatch) => ({
  onLoadPage: () => {
    dispatch(fetchAllShoppingLists());
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);

