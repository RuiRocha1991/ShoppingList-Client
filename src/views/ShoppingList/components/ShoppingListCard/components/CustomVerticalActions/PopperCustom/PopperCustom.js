import React from 'react';
import {
  Divider,
  Menu,
  MenuItem,
} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ListIcon from '@material-ui/icons/List';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: '16px',
  },
  divider: {
    margin: '8px 0'
  }
}));

const PopperCustom = ({handleClose, isOpen, anchorEl, handleEdit, shoppingList, handleDelete, handlePurchases}) => {
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
          handlePurchases(shoppingList);
          handleClose();
        }}>
          <ListIcon  className={classes.icon} />
          Prepare Purchases
        </MenuItem>
        <Divider className={classes.divider}/>
        <MenuItem onClick={() => {
          handleEdit(shoppingList);
          handleClose();
        }}>
          <EditIcon  className={classes.icon} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => {
          handleDelete(shoppingList);
          handleClose();
        }}>
          <DeleteIcon className={classes.icon} />
          Delete
        </MenuItem>
      </Menu>
  )
}

export default PopperCustom;