import {errorMessage, fetchStart, fetchStop} from "./ui.actions";
import store from "../store";
import axios from "axios";
import {logoutFinally} from "./user.actions";
import {ITEM_FETCH_ALL} from "../../Constants";

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
      dispatch(fecthAllItemsByUserSuccess(response.data.items));
      dispatch(fetchStop());
    }
  }).catch(err => {
    dispatch(errorMessage(err));
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
  });
}

export const fetchItemsByNameAndUser =  (data) => (dispatch) => {
  dispatch(fetchStart());
  const token = store.getState().user.token;
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_SERVER_URL}/item/${data}`,
    headers: { token },
    withCredentials: true
  }).then(response => {
    if (response.status === 200) {
      dispatch(fecthAllItemsByUserSuccess(response.data.items));
      dispatch(fetchStop());
    }
  }).catch(err => {
    dispatch(errorMessage(err));
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
  });
}


export const fecthAllItemsByUserSuccess = (data) => ({
  type: ITEM_FETCH_ALL,
  payload: data
})
