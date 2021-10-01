import {
  closeDeleteDialog,
  closeItemsDialog,
  errorMessage,
  fetchStart,
  fetchStop,
  showSuccessMessage
} from "./ui.actions";
import store from "../store";
import axios from "axios";
import {logoutFinally} from "./user.actions";
import {ITEM_FETCH_ALL} from "../../Constants";
import {fetchAllCategories} from "./category.actions";

export const fetchAllItemsByUser =  () => (dispatch) => {
  dispatch(fetchStart());
  const token = store.getState().user.token;
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_SERVER_URL}/item/`,
    headers: { token },
    withCredentials: true
  }).then(response => {
    if (response.status === 200) {
      dispatch(fecthAllItemsByUserSuccess({items: response.data.items, categories: response.data.categories}));
      dispatch(fetchStop());
    }
  }).catch(err => {
    dispatch(errorMessage(err));
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
  });
}

export const createItem =  (item) => (dispatch) => {
  dispatch(fetchStart());
  const token = store.getState().user.token;
  axios({
    method: 'POST',
    url: `${process.env.REACT_APP_SERVER_URL}/item/`,
    data: item,
    headers: { token },
    withCredentials: true
  }).then(response => {
    if (response.status === 201) {
      successMessage(response.data.message, dispatch);
    }
  }).catch(err => {
    dispatch(errorMessage(err.response.data));
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
  });
}
export const editItem =  (newFormValues, item) => (dispatch) => {
  dispatch(fetchStart());
  const token = store.getState().user.token;
  axios({
    method: 'PUT',
    url: `${process.env.REACT_APP_SERVER_URL}/item/${item._id}`,
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

export const deleteItem = (item) => (dispatch) => {
  dispatch(fetchStart());
  const token = store.getState().user.token;
  axios({
    method: 'DELETE',
    url: `${process.env.REACT_APP_SERVER_URL}/item/${item._id}`,
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

const successMessage = (message, dispatch) => {
  dispatch(fetchStop());
  dispatch(closeItemsDialog());
  dispatch(showSuccessMessage({message}))
  dispatch(fetchAllItemsByUser());
}

export const fecthAllItemsByUserSuccess = (data) => ({
  type: ITEM_FETCH_ALL,
  payload: data
})
