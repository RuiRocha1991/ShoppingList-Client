import {
  errorMessage,
  fetchStart,
  fetchStop,
  showSuccessMessage
} from "./ui.actions";
import store from "../store";
import axios from "axios";
import {logoutFinally} from "./user.actions";

import {
  closeCreateEditItemDialog,
  closeDeleteDialog,
  fetchAllCategories
} from "./category.actions";


export const createItem =  (item, category) => (dispatch) => {
  dispatch(fetchStart());
  const token = store.getState().user.token;
  axios({
    method: 'POST',
    url: `${process.env.REACT_APP_SERVER_URL}/item/${category._id}`,
    data: item,
    headers: { token },
    withCredentials: true
  }).then(response => {
    if (response.status === 201) {
      successMessage(response.data.message, dispatch, 'added');
    }
  }).catch(err => {
    dispatch(errorMessage(err.response.data));
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
  });
}
export const editItem =  (newFormValues, item, category) => (dispatch) => {
  dispatch(fetchStart());
  const token = store.getState().user.token;
  axios({
    method: 'PUT',
    url: `${process.env.REACT_APP_SERVER_URL}/item/${category._id}/${item._id}`,
    data: newFormValues,
    headers: { token },
    withCredentials: true
  }).then(response => {
    if (response.status === 200) {
      successMessage(response.data.message, dispatch);
    }
  }).catch(err => {
    dispatch(errorMessage(err.response.data));
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
  });
}

export const deleteItem = (category, item) => (dispatch) => {
  dispatch(fetchStart());
  const token = store.getState().user.token;
  axios({
    method: 'DELETE',
    url: `${process.env.REACT_APP_SERVER_URL}/item/${category._id}/${item._id}`,
    headers: { token },
    withCredentials: true
  }).then(response => {
    if (response.status === 200) {
      successMessage(response.data.message, dispatch);
      dispatch(closeDeleteDialog());
    }
  }).catch(err => {
    console.log(err);
    dispatch(errorMessage(err.response.data));
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
  });
}

const successMessage = (message, dispatch, added) => {
  dispatch(fetchStop());
  if (!store.getState().ui.keepDialogOpen || !added) {
    dispatch(closeCreateEditItemDialog());
  }
  dispatch(showSuccessMessage({message}))
  dispatch(fetchAllCategories());
}
