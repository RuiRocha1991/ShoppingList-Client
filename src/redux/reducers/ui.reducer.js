import {
  UI_CLOSE_ERROR,
  UI_FETCHING_FALSE,
  UI_FETCHING_TRUE,
  UI_SHOW_ERROR
} from '../../Constants';

const initialState = {
  isFetching: false,
  error: {
    message: '',
    isOpen: false
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UI_FETCHING_TRUE:
      return {
        ...state,
        isFetching: true
      }
    case UI_FETCHING_FALSE:
      return {
        ...state,
        isFetching: false
      }
    case UI_SHOW_ERROR:
      return {
        ...state,
        isFetching: false,
        error: {
          message: action.payload.message,
          isOpen: true
        }
      }
    case UI_CLOSE_ERROR:
      return {
        ...state,
        error: {
          message: '',
          isOpen: false
        }
      }
    default:
      return state

  }
}
