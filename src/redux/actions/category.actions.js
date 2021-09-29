import {
  fetchStart,
  fetchStop,
  errorMessage,
  closeDialog,
  showSuccessMessage, closeDeleteDialog
} from "./ui.actions";
import axios from "axios";
import {CATEGORY_FETCH_ALL} from '../../Constants';
import store from "../store";

export const createCategory =  (category) => (dispatch) => {
  dispatch(fetchStart());
  const token = store.getState().user.token;
  axios({
    method: 'POST',
    url: `${process.env.REACT_APP_SERVER_URL}/category/`,
    data: category,
    headers: { token },
    withCredentials: true
  }).then(response => {
    if (response.status === 201) {
      dispatch(fetchStop());
      dispatch(closeDialog());
      dispatch(showSuccessMessage({message: response.data.message}))
      dispatch(fetchAllCategories());
    }
  }).catch(err => {
    dispatch(errorMessage(err.response.data));
  });
}
export const editCategory =  (newFormValues, category) => (dispatch) => {
  dispatch(fetchStart());
  const token = store.getState().user.token;
  axios({
    method: 'PUT',
    url: `${process.env.REACT_APP_SERVER_URL}/category/${category._id}`,
    data: newFormValues,
    headers: { token },
    withCredentials: true
  }).then(response => {
    if (response.status === 200) {
      dispatch(fetchStop());
      dispatch(closeDialog());
      dispatch(showSuccessMessage({message: response.data.message}))
      dispatch(fetchAllCategories());
    }
  }).catch(err => {
    dispatch(errorMessage(err.response.data));
  });
}

export const fetchAllCategories =  () => (dispatch) => {
  dispatch(fetchStart());
  const token = store.getState().user.token;
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_SERVER_URL}/category/`,
    headers: { token },
    withCredentials: true
  }).then(response => {
    if (response.status === 200) {
      console.log(response.data.categories)
      dispatch(fecthAllCategoriesSuccess(response.data.categories));
      dispatch(fetchStop());
    }
  }).catch(err => {
    dispatch(errorMessage(err));
  });
}

export const deleteCategory = (category) => (dispatch) => {
  dispatch(fetchStart());
  const token = store.getState().user.token;
  axios({
    method: 'DELETE',
    url: `${process.env.REACT_APP_SERVER_URL}/category/${category._id}`,
    headers: { token },
    withCredentials: true
  }).then(response => {
    if (response.status === 200) {
      dispatch(fetchStop());
      dispatch(closeDeleteDialog());
      dispatch(showSuccessMessage({message: response.data.message}))
      dispatch(fetchAllCategories());
    }
  }).catch(err => {
    dispatch(errorMessage(err.response.data));
  });
}

export const fecthAllCategoriesSuccess = (data) => ({
  type: CATEGORY_FETCH_ALL,
  payload: data
});