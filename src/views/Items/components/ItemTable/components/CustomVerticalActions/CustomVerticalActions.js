import React, {useState} from 'react'
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {IconButton} from "@material-ui/core";
import PopperCustom from "./PopperCustom";

const CustomVerticalActions = ({category, handleDelete, handleEdit, item, handleCreateItemDialog}) => {
  const [state, setState] = useState({
    anchorEl: null,
    isOpen: false
  });

  const handleOpen = (event) => {
    setState((state) => ({
      ...state,
      isOpen: !state.isOpen,
      anchorEl: event.currentTarget
    }));
  };

  const handleClose = () => {
    setState((state) => ({
      ...state,
      isOpen: false,
      anchorEl: null
    }));
  };

  return (
      <>
        <IconButton aria-label="settings" onClick={(event) => handleOpen(event)} aria-haspopup="true">
          <MoreVertIcon />
        </IconButton>
        <PopperCustom
            item={item}
            category={category}
            isOpen={state.isOpen}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleClose={handleClose}
            anchorEl={state.anchorEl}
            handleCreateItemDialog={handleCreateItemDialog}/>
      </>

  )

}
export default CustomVerticalActions;