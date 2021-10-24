import {
  SHOPPING_LIST_CREATE_EDIT_CLOSE,
  SHOPPING_LIST_CREATE_OPEN,
  SHOPPING_LIST_DELETE_OPEN,
  SHOPPING_LIST_DELETE_SUCCESS,
  SHOPPING_LIST_EDIT_OPEN,
  SHOPPING_LIST_FETCH_ALL_SUCCESS,
  SHOPPING_LIST_FETCHING_CATEGORIES_FALSE,
  SHOPPING_LIST_FETCHING_CATEGORIES_TRUE,
  SHOPPING_LIST_PURCHASES_ADD_ITEMS,
  SHOPPING_LIST_PURCHASES_CHANGE_QUANTITY_SELECTED_LIST,
  SHOPPING_LIST_PURCHASES_CHANGE_QUANTITY_UNSELECTED_LIST,
  SHOPPING_LIST_PURCHASES_CHECK_ITEM_TO_ADD,
  SHOPPING_LIST_PURCHASES_CHECK_ITEM_TO_REMOVE,
  SHOPPING_LIST_PURCHASES_DIALOG_CLOSE,
  SHOPPING_LIST_PURCHASES_DIALOG_OPEN,
  SHOPPING_LIST_PURCHASES_REMOVE_ITEMS,
  SHOPPING_LIST_PURCHASES_SORT_SELECTED_ITEMS,
  SHOPPING_LIST_PURCHASES_SORT_UNSELECTED_ITEMS,
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
  axios({
    method: 'POST',
    url: `${process.env.REACT_APP_SERVER_URL}/shopping-list`,
    data: shoppingList,
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

export const openDialogToEdit = (data) => dispatch => {
  const token = store.getState().user.token;
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_SERVER_URL}/category/shopping-list`,
    headers: { token },
    withCredentials: true
  }).then(response => {
    if (response.status === 200) {
      dispatch(fetchCategoriesStop(response.data));
      dispatch({
        type: SHOPPING_LIST_EDIT_OPEN,
        payload: data
      })
    }
  }).catch(err => {
    dispatch(errorMessage(err));
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
  });
};

export const editShoppingList = (newShoppingList, shoppingList) => (dispatch) => {
  dispatch(fetchStart());
  const token = store.getState().user.token;

  axios({
    method: 'PUT',
    url: `${process.env.REACT_APP_SERVER_URL}/shopping-list/${shoppingList._id}`,
    data: newShoppingList,
    headers: { token },
    withCredentials: true
  }).then(response => {
    dispatch(fetchStop());
    dispatch(showSuccessMessage({message: response.data.message}))
    dispatch(fetchAllShoppingLists());
    dispatch(closeDialogToCreateEditShoppingList());
  }).catch(err => {
    dispatch(errorMessage(err));
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
  });
};

export const openDeleteDialog = (data) => ({
  type: SHOPPING_LIST_DELETE_OPEN,
  payload: data
});

export const closeDeleteDialog = () => ({
  type: SHOPPING_LIST_DELETE_SUCCESS,
});

export const deleteShoppingList = (shoppingList) => (dispatch) => {
  dispatch(fetchStart());
  const token = store.getState().user.token;
  axios({
    method: 'DELETE',
    url: `${process.env.REACT_APP_SERVER_URL}/shopping-list/${shoppingList._id}`,
    headers: { token },
    withCredentials: true
  }).then(response => {
    if (response.status === 200) {
      dispatch(fetchStop());
      dispatch(closeDeleteDialog());
      dispatch(showSuccessMessage({message: response.data.message}))
      dispatch(fetchAllShoppingLists());
    }
  }).catch(err => {
    dispatch(errorMessage(err.response.data));
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
  });
}

export const openPurchasesDialog = (data) => ({
  type: SHOPPING_LIST_PURCHASES_DIALOG_OPEN,
  payload: data
});

export const closePurchasesDialog = () => ({
  type: SHOPPING_LIST_PURCHASES_DIALOG_CLOSE
});

export const updateUnselectedItems = (list) => ({
  type: SHOPPING_LIST_PURCHASES_SORT_UNSELECTED_ITEMS,
  payload: list
});

export const updateSelectedItems = (list) => ({
  type: SHOPPING_LIST_PURCHASES_SORT_SELECTED_ITEMS,
  payload: list
});

export const addItems = () => ({
  type: SHOPPING_LIST_PURCHASES_ADD_ITEMS,
});

export const removeItems = () => ({
  type: SHOPPING_LIST_PURCHASES_REMOVE_ITEMS,
});

export const changeQuantityOnUnselected = (id, quantity) => ({
  type: SHOPPING_LIST_PURCHASES_CHANGE_QUANTITY_UNSELECTED_LIST,
  payload: {id, quantity}
});

export const changeQuantityOnSelected = (id, quantity) => ({
  type: SHOPPING_LIST_PURCHASES_CHANGE_QUANTITY_SELECTED_LIST,
  payload: {id, quantity}
});

export const addItemToRemove = (id, isChecked) => ({
  type: SHOPPING_LIST_PURCHASES_CHECK_ITEM_TO_REMOVE,
  payload: {isChecked, id}
});

export const addItemToAdd = (id, isChecked) => ({
  type: SHOPPING_LIST_PURCHASES_CHECK_ITEM_TO_ADD,
  payload: {isChecked, id}
});

export const saveShoppingList = (shoppingList) => (dispatch) =>  {
  console.log(shoppingList);
  dispatch(fetchStart());
  const token = store.getState().user.token;
  axios({
    method: 'PUT',
    url: `${process.env.REACT_APP_SERVER_URL}/shopping-list/save/${shoppingList._id}`,
    data: shoppingList,
    headers: { token },
    withCredentials: true
  }).then(response => {
    dispatch(fetchStop());
    dispatch(showSuccessMessage({message: response.data.message}))
    dispatch(fetchAllShoppingLists());
    dispatch(closePurchasesDialog());
  }).catch(err => {
    dispatch(errorMessage(err));
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
  });
};