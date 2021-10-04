import {
  ITEM_CHANGE_ROWS_PER_PAGE_ON_TABLE,
  UI_CLOSE_INFO,
  UI_FETCHING_FALSE,
  UI_FETCHING_TRUE,
  UI_SHOW_INFO_ERROR,
  UI_SHOW_INFO_SUCCESS,
} from "../../Constants";
import {fetchAllItemsByUser} from "./item.actions";

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

export const changePageOnItemsTable = (page) => (dispatch) => {
  dispatch(fetchAllItemsByUser(page));
}

export const changeRowsPerPageOnItemsTable = (rowsPerPage) => (dispatch) => {
  dispatch({
    type: ITEM_CHANGE_ROWS_PER_PAGE_ON_TABLE,
    payload: rowsPerPage
  });
  dispatch(fetchAllItemsByUser(0));
}