import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';

import { ItemsToolbar, ItemsTable, DeleteDialog, ItemCreateEdit } from './components';
import {connect} from "react-redux";
import {fetchAllItemsByUser} from "../../redux/actions/item.actions";
import {Box, LinearProgress} from "@material-ui/core";
import SnackbarCustom from "../../components/SnackbarCustom/SnackbarCustom";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
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
}));

const Items = ({onLoadPage, items, isFetching,isItemDialogOpen, deleteDialog}) => {
  const classes = useStyles();
  useEffect(() => {
    onLoadPage();
  },[]);
  return (
    <div className={classes.root}>
      <ItemsToolbar />
      <SnackbarCustom />
      <div className={classes.content}>
        {isFetching &&
        <Box component={'div'} boxShadow={3} className={classes.processContent} >
          <LinearProgress className={classes.progress}/>
        </Box>}
        {isItemDialogOpen && <ItemCreateEdit />}
        {deleteDialog.isOpen && <DeleteDialog />}
        {(!isFetching || (isFetching && (isItemDialogOpen || deleteDialog.isOpen))) && <ItemsTable items={items}/>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isFetching: state.ui.isFetching,
  items: state.item.items,
  isItemDialogOpen: state.ui.isItemDialogOpen,
  deleteDialog: state.ui.deleteDialog
})

const mapDispatchToProps = (dispatch) => ({
  onLoadPage: () => {
    dispatch(fetchAllItemsByUser());
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Items);
