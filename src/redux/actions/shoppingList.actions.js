import {
  CATEGORY_FETCH_ALL,
  SHOPPING_LIST_CREATE_EDIT_CLOSE,
  SHOPPING_LIST_CREATE_OPEN, SHOPPING_LIST_FETCH_ALL_SUCCESS,
  SHOPPING_LIST_FETCHING_CATEGORIES_FALSE,
  SHOPPING_LIST_FETCHING_CATEGORIES_TRUE,
} from "../../Constants";
import {
  errorMessage, fetchStart, fetchStop, showSuccessMessage,
} from "./ui.actions";
import store from "../store";
import axios from "axios";
import {logoutFinally} from "./user.actions";


export const openDialogToCreateShoppingList = () => (dispatch) => {
  dispatch(fetchCategoriesStart());
  const token = store.getState().user.token;
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_SERVER_URL}/category/shopping-list`,
    headers: { token },
    withCredentials: true
  }).then(response => {
    if (response.status === 200) {
      dispatch(fetchCategoriesStop(response.data));
      dispatch({type: SHOPPING_LIST_CREATE_OPEN})
    }
  }).catch(err => {
    dispatch(errorMessage(err));
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
  });
};

export const fetchAllShoppingLists = () => async (dispatch) => {
  dispatch(fetchStart());
  await setTimeout(function(){ }, 5000);
  const token = store.getState().user.token;
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_SERVER_URL}/shopping-list`,
    headers: { token },
    withCredentials: true
  }).then(response => {
    if (response.status === 200) {
      dispatch(fecthAllShoppingListSuccess(response.data.shoppingLists));
      dispatch(fetchStop());
    }
  }).catch(err => {
    dispatch(errorMessage(err));
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
  });
};

export const closeDialogToCreateEditShoppingList = () => ({
  type: SHOPPING_LIST_CREATE_EDIT_CLOSE,
});

export const fetchCategoriesStart = () => ({
  type: SHOPPING_LIST_FETCHING_CATEGORIES_TRUE
});

export const fetchCategoriesStop = (data) => ({
  type: SHOPPING_LIST_FETCHING_CATEGORIES_FALSE,
  payload: {categories: data}
});

export const createShoppingList = (shoppingList) => (dispatch) => {
  dispatch(fetchStart());
  const token = store.getState().user.token;
  const categories = shoppingList.categories.map(category => category._id);
  const list = {
    ...shoppingList,
    categories
  }
  axios({
    method: 'POST',
    url: `${process.env.REACT_APP_SERVER_URL}/shopping-list`,
    data: list,
    headers: { token },
    withCredentials: true
  }).then(response => {
    dispatch(showSuccessMessage({message: response.data.message}))
    dispatch(fetchAllShoppingLists());
    dispatch(fetchStop());
    dispatch(closeDialogToCreateEditShoppingList());
  }).catch(err => {
    dispatch(errorMessage(err));
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
  });
};

export const fecthAllShoppingListSuccess = (data) => ({
  type: SHOPPING_LIST_FETCH_ALL_SUCCESS,
  payload: data
});