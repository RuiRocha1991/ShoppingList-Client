import React from 'react';
import {
  Menu,
  MenuItem,
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: '16px',
  },
}));

const PopperCustom = ({handleClose, isOpen, anchorEl, handleEdit, category, handleDelete}) => {
  const classes = useStyles();
  return (
      <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={isOpen}
          onClose={handleClose}
      >
        <MenuItem onClick={() => {
          handleEdit(category);
          handleClose();
        }}><EditIcon  className={classes.icon} /> Edit</MenuItem>
        <MenuItem onClick={() => {
          handleDelete(category._id);
          handleClose();
        }}><DeleteIcon className={classes.icon} /> Delete</MenuItem>
      </Menu>
  )
}

export default PopperCustom;