import {
  fetchStart,
  fetchStop,
  errorMessage,
  showSuccessMessage
} from "./ui.actions";
import axios from "axios";
import {
  CATEGORY_ADD_ITEM,
  CATEGORY_CLOSE_CREATE_EDIT_DIALOG,
  CATEGORY_CLOSE_CREATE_EDIT_ITEM_DIALOG,
  CATEGORY_CLOSE_DELETE_DIALOG, CATEGORY_CREATE,
  CATEGORY_DELETE,
  CATEGORY_DELETE_ITEM,
  CATEGORY_EDIT, CATEGORY_EDIT_ITEM,
  CATEGORY_FETCH_ALL
} from '../../Constants';
import store from "../store";
import {logoutFinally} from "./user.actions";

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
      dispatch(closeCreateEditCategoryDialog());
      dispatch(showSuccessMessage({message: response.data.message}))
      dispatch(fetchAllCategories());
    }
  }).catch(err => {
    dispatch(errorMessage(err.response.data));
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
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
      dispatch(closeCreateEditCategoryDialog());
      dispatch(showSuccessMessage({message: response.data.message}))
      dispatch(fetchAllCategories());
    }
  }).catch(err => {
    dispatch(errorMessage(err.response.data));
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
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
      dispatch(fecthAllCategoriesSuccess(response.data.categories));
      dispatch(fetchStop());
    }
  }).catch(err => {
    dispatch(errorMessage(err));
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
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
    if (err.response.status === 401) {
      dispatch(logoutFinally());
    }
  });
}

export const fecthAllCategoriesSuccess = (data) => ({
  type: CATEGORY_FETCH_ALL,
  payload: data
});

export const openDeleteCategoryDialod = (data) => ({
  type: CATEGORY_DELETE,
  payload: data
})

export const openDeleteItemDialod = (data) => ({
  type: CATEGORY_DELETE_ITEM,
  payload: data
})

export const closeDeleteDialog = () => ({
  type: CATEGORY_CLOSE_DELETE_DIALOG
})

export const closeCreateEditCategoryDialog = () => ({
  type: CATEGORY_CLOSE_CREATE_EDIT_DIALOG
})

export const closeCreateEditItemDialog = () => ({
  type: CATEGORY_CLOSE_CREATE_EDIT_ITEM_DIALOG
})

export const openDialogToEditCategory = (data) => ({
  type: CATEGORY_EDIT,
  payload: data
});

export const openDialogToCreateItem = (data) => ({
  type: CATEGORY_ADD_ITEM,
  payload: data
});

export const openDialogToCreateCategory = () => ({
  type: CATEGORY_CREATE,
});

export const openDialogToEditItem = (data) => ({
  type: CATEGORY_EDIT_ITEM,
  payload: data
});