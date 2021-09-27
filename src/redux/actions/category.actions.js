import {
  fetchStart,
  fetchStop,
  errorMessage,
  closeDialog,
  showSuccessMessage
} from "./ui.actions";
import axios from "axios";
import {CATEGORY_FETCH_ALL} from '../../Constants';

export const createCategory =  (category) => (dispatch) => {
  dispatch(fetchStart());
  axios({
    method: 'POST',
    url: `${process.env.REACT_APP_SERVER_URL}/category/`,
    data: category,
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
  axios({
    method: 'PUT',
    url: `${process.env.REACT_APP_SERVER_URL}/category/${category._id}`,
    data: newFormValues,
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
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_SERVER_URL}/category/`,
    withCredentials: true
  }).then(response => {
    if (response.status === 200) {
      dispatch(fecthAllCategoriesSuccess(response.data));
      dispatch(fetchStop());
    }
  }).catch(err => {
    dispatch(errorMessage(err));
  });
}

export const fecthAllCategoriesSuccess = (data) => ({
  type: CATEGORY_FETCH_ALL,
  payload: data
});