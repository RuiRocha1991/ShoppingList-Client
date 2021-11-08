import React, {useState} from 'react'
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {IconButton} from "@material-ui/core";
import PopperCustom from "./PopperCustom";

const CustomVerticalActions = ({shoppingList, handleDelete, handleEdit, item, handleCreateItemDialog, handlePurchases, handleShoppingMode}) => {
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
            shoppingList={shoppingList}
            isOpen={state.isOpen}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleClose={handleClose}
            anchorEl={state.anchorEl}
            handleCreateItemDialog={handleCreateItemDialog}
            handlePurchases={handlePurchases}
            handleShoppingMode={handleShoppingMode}
        />
      </>

  )

}
export default CustomVerticalActions;