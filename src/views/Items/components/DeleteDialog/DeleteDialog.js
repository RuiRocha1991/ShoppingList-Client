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
} from "../../../../redux/actions/ui.actions";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/styles";
import {deleteItem} from "../../../../redux/actions/item.actions";

const useStyles = makeStyles(theme => ({
  process: {
    marginRight: '16px',
  },
}));

const DeleteDialog = ({deleteDialog, handleClose, handleDelete, category, isFetching}) => {
  const classes = useStyles();
  return ( <Dialog
      open={deleteDialog.isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Delete Item"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to delete this Item?
        <Typography variant={'h3'}>
          {category.name}
        </Typography>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={() => handleDelete(category)} color="primary" autoFocus>
        {isFetching && <CircularProgress size={20} color='inherit' className={classes.progress} />} Delete
      </Button>
    </DialogActions>
  </Dialog>)
}


const mapStateToProps = (state) => ({
  deleteDialog: state.ui.deleteDialog,
  isFetching: state.ui.isFetching,
  category: state.ui.deleteDialog.category
})

const mapDispatchToProps = (dispatch) => ({
  handleDelete: (item) => {
      dispatch(deleteItem(item));
  },
  handleClose: () => {
    dispatch(closeDeleteDialog());
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDialog)