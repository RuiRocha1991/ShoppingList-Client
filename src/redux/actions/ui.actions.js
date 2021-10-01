import {
  ITEM_CLOSE_DIALOG,
  ITEM_OPEN_DIALOG,
  UI_CLOSE_DELETE_DIALOG,
  UI_CLOSE_DIALOG,
  UI_CLOSE_INFO, UI_CLOSE_ITEM_DIALOG,
  UI_FETCHING_FALSE,
  UI_FETCHING_TRUE,
  UI_OPEN_DELETE_DIALOG,
  UI_OPEN_DIALOG, UI_OPEN_ITEM_DIALOG,
  UI_SHOW_INFO_ERROR,
  UI_SHOW_INFO_SUCCESS,
} from "../../Constants";

export const fetchStart = () => ({
  type: UI_FETCHING_TRUE
});

export const fetchStop = () => ({
  type: UI_FETCHING_FALSE
});

export const showErrorMessage = (data) => ({
  type: UI_SHOW_INFO_ERROR,
  payload: data
});

export const showSuccessMessage = (data) => ({
  type: UI_SHOW_INFO_SUCCESS,
  payload: data
});

export const closeErrorMessage = () => ({
  type: UI_CLOSE_INFO,
});

export const errorMessage = (err) => (dispatch) => {
  dispatch(showErrorMessage({message: err.message}));
  console.error(err);
};

export const openDialog = (data) => ({
  type: UI_OPEN_DIALOG,
  payload: data
});

export const openItemsDialog = (data) => (dispatch) =>{
  dispatch({type: UI_OPEN_ITEM_DIALOG});
  dispatch({type: ITEM_OPEN_DIALOG, payload: data});
};

export const closeItemsDialog = () => (dispatch) =>{
  dispatch({type: UI_CLOSE_ITEM_DIALOG});
  dispatch({type: ITEM_CLOSE_DIALOG});
};

export const closeDialog = () => {
  return { type: UI_CLOSE_DIALOG}
};

export const openDeleteDialog = (data) => ({
  type: UI_OPEN_DELETE_DIALOG,
  payload: data
});

export const closeDeleteDialog = () => {
  return { type: UI_CLOSE_DELETE_DIALOG}
};