import {
  fetchStart,
  fetchStop,
  errorMessage,
  closeDialog,
  showSuccessMessage
} from "./ui.actions";
import axios from "axios";

export const createCategory =  (category) => (dispatch) => {
  dispatch(fetchStart());
  axios({
    method: 'POST',
    url: `${process.env.REACT_APP_SERVER_URL}/category/`,
    data: category,
    withCredentials: true
  }).then(response => {
    if (response.status === 200) {
      dispatch(fetchStop());
      dispatch(closeDialog());
      dispatch(showSuccessMessage({message: response.data.message}))
      dispatch(getAllCategories());
    }
  }).catch(err => {
    dispatch(errorMessage(err.response.data));
  });
}

export const getAllCategories =  () => (dispatch) => {
  dispatch(fetchStart());
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_SERVER_URL}/category/`,
    withCredentials: true
  }).then(response => {
    if (response.status === 200) {
      dispatch(fetchStop());
    }
  }).catch(err => {
    dispatch(errorMessage(err));
  });
}
