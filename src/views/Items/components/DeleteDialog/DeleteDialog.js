import React from 'react'
import {
  Button, CircularProgress,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Typography
} from "@material-ui/core";
import {
  closeDeleteDialog,
  deleteCategory
} from "../../../../redux/actions/category.actions";

import {connect} from "react-redux";
import {makeStyles} from "@material-ui/styles";
import {deleteItem} from "../../../../redux/actions/item.actions";

const useStyles = makeStyles(theme => ({
  process: {
    marginRight: '16px',
  },
}));

const DeleteDialog = ({dialog, handleClose, handleDelete, isFetching}) => {
  const classes = useStyles();
  return ( <Dialog
      open={dialog.isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Delete Category"}</DialogTitle>
    <DialogContent>
      {!dialog.item && <DialogContentText id="alert-dialog-description">
        Are you sure you want to delete this category?
        <Typography variant={'h3'}>
          {dialog.category.name}
        </Typography>
      </DialogContentText>}
      {dialog.item && <DialogContentText id="alert-dialog-description">
        Are you sure you want to delete this item?
        <Typography variant={'h3'}>
          {dialog.item.name}
        </Typography>
      </DialogContentText>}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={() => handleDelete(dialog.category, dialog.item)} color="primary" autoFocus>
        {isFetching && <CircularProgress size={20} color='inherit' className={classes.progress} />} Delete
      </Button>
    </DialogActions>
  </Dialog>)
}


const mapStateToProps = (state) => ({
  dialog: state.category.dialogToDelete,
  isFetching: state.ui.isFetching,
})

const mapDispatchToProps = (dispatch) => ({
  handleDelete: (category, item) => {
    if(item) {
      dispatch(deleteItem(category, item))
    } else {
      dispatch(deleteCategory(category));
    }

  },
  handleClose: () => {
    dispatch(closeDeleteDialog());
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDialog)