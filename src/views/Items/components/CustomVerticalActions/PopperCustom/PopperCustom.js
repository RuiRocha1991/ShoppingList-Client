import React from 'react';
import {
  Menu,
  MenuItem,
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: '16px',
  },
}));

const PopperCustom = ({handleClose, isOpen, anchorEl, handleEdit, category, handleDelete, handleCreateItemDialog, item}) => {
  const classes = useStyles();
  return (
      <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={isOpen}
          onClose={handleClose}
      >
        {handleCreateItemDialog && <MenuItem onClick={() => {
          handleCreateItemDialog(category);
          handleClose();
        } }>
          <AddIcon  className={classes.icon} />
          Add
        </MenuItem>}
        <MenuItem onClick={() => {
          if(item){
            handleEdit(category, item);
          }else {
            handleEdit(category);
          }
          handleClose();
        }}>
          <EditIcon  className={classes.icon} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => {
          if(item){
            handleDelete(category, item);
          }else {
            handleDelete(category);
          }
          handleClose();
        }}>
          <DeleteIcon className={classes.icon} />
          Delete
        </MenuItem>
      </Menu>
  )
}

export default PopperCustom;