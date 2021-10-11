import React from 'react'
import {
  Button, CircularProgress,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Typography
} from "@material-ui/core";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/styles";
import {deleteShoppingList, closeDeleteDialog} from "../../../../redux/actions/shoppingList.actions";

const useStyles = makeStyles(theme => ({
  process: {
    marginRight: '16px',
  },
}));

const DeleteDialog = ({dialog, isFetching, handleClose, handleDelete}) => {
  const classes = useStyles();
  return ( <Dialog
      open={dialog.isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Delete Category"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to delete this Shopping List ?
        {dialog.shoppingList && <Typography variant={'h3'}>
          {dialog.shoppingList.name}
        </Typography>}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => handleClose()} color="primary">
        Cancel
      </Button>
      <Button onClick={() => handleDelete(dialog.shoppingList)} color="primary" autoFocus>
        {isFetching && <CircularProgress size={20} color='inherit' className={classes.progress}/>} Delete
      </Button>
    </DialogActions>
  </Dialog>)
}


const mapStateToProps = (state) => ({
  dialog: state.shoppingList.deleteDialog,
  isFetching: state.ui.isFetching,
})

const mapDispatchToProps = (dispatch) => ({
  handleDelete: (shoppingList) => {
    dispatch(deleteShoppingList(shoppingList));
  },
  handleClose: () => {
    dispatch(closeDeleteDialog());
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDialog)