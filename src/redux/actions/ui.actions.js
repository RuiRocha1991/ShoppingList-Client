import {
  UI_CLOSE_INFO,
  UI_FETCHING_FALSE,
  UI_FETCHING_TRUE, UI_KEEP_DIALOG_OPEN,
  UI_SHOW_INFO_ERROR,
  UI_SHOW_INFO_SUCCESS,
} from "../../Constants";

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


export const handleChangeCheckbox = () => ({
    type: UI_KEEP_DIALOG_OPEN,
});
