import {
  UI_CLOSE_INFO,
  UI_FETCHING_FALSE,
  UI_FETCHING_TRUE, UI_KEEP_DIALOG_OPEN,
  UI_SHOW_INFO_ERROR,
  UI_SHOW_INFO_SUCCESS
} from '../../Constants';

const initialState = {
  isFetching: false,
  keepDialogOpen: false,
  info: {
    type: 'error',
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
    case UI_SHOW_INFO_ERROR:
      return {
        ...state,
        isFetching: false,
        info: {
          message: action.payload.message,
          isOpen: true,
          type: 'error'
        }
      }
    case UI_SHOW_INFO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        info: {
          message: action.payload.message,
          isOpen: true,
          type: 'success'
        }
      }
    case UI_CLOSE_INFO:
      return {
        ...state,
        info: {
          ...state.info,
          message: '',
          isOpen: false,
        }
      }
    case UI_KEEP_DIALOG_OPEN:
      return {
        ...state,
        keepDialogOpen: !state.keepDialogOpen
      }
    default:
      return state
  }
}
