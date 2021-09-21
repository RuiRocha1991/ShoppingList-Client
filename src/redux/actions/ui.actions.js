import {
  UI_CLOSE_ERROR,
  UI_FETCHING_FALSE,
  UI_FETCHING_TRUE,
  UI_SHOW_ERROR
} from "../../Constants";

export const fetchSignInStart = () => ({
  type: UI_FETCHING_TRUE
});

export const fetchSignInStop = () => ({
  type: UI_FETCHING_FALSE
});

export const showErrorMessage = (data) => ({
  type: UI_SHOW_ERROR,
  payload: data
});

export const closeErrorMessage = () => ({
  type: UI_CLOSE_ERROR,
})