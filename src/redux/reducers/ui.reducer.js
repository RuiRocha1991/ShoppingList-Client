import {
  UI_CLOSE_DELETE_DIALOG,
  UI_CLOSE_DIALOG,
  UI_CLOSE_INFO, UI_CLOSE_ITEM_DIALOG,
  UI_FETCHING_FALSE,
  UI_FETCHING_TRUE, UI_OPEN_DELETE_DIALOG,
  UI_OPEN_DIALOG, UI_OPEN_ITEM_DIALOG,
  UI_SHOW_INFO_ERROR,
  UI_SHOW_INFO_SUCCESS
} from '../../Constants';

const initialState = {
  isFetching: false,
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
      case UI_OPEN_DIALOG:
        return {
          ...state,
          dialog: {
            isOpen: true,
            objectToEdit: action.payload
          }
      }
      case UI_CLOSE_DIALOG:
      return {
        ...state,
        dialog: {
          isOpen: false,
          objectToEdit: undefined
        }
      }
      case UI_OPEN_DELETE_DIALOG:
        return {
          ...state,
          deleteDialog: {
            isOpen: true,
            category: action.payload.category,
            item:action.payload.item
          }
      }
      case UI_CLOSE_DELETE_DIALOG:
      return {
        ...state,
        deleteDialog: {
          isOpen: false,
          category: undefined
        }
      }
    case UI_OPEN_ITEM_DIALOG:
      return {
        ...state,
        isItemDialogOpen: true
      }
    case UI_CLOSE_ITEM_DIALOG:
      return {
        ...state,
        isItemDialogOpen: false
      }
    default:
      return state
  }
}
