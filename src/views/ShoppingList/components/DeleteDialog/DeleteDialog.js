import React from 'react'
import {
  Button, CircularProgress,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Typography
} from "@material-ui/core";
import {deleteCategory,} from "../../../../redux/actions/category.actions";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  process: {
    marginRight: '16px',
  },
}));

const DeleteDialog = ({}) => {
  const classes = useStyles();
  return ( <Dialog
      open={false}
      onClose={() => console.log("close")}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Delete Category"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to delete this category?
        <Typography variant={'h3'}>
          name
        </Typography>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => console.log("close")} color="primary">
        Cancel
      </Button>
      <Button onClick={() => console.log("close")} color="primary" autoFocus>
         <CircularProgress size={20} color='inherit' className={classes.progress} /> Delete
      </Button>
    </DialogActions>
  </Dialog>)
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDialog)