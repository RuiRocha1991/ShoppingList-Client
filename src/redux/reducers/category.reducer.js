import {
  CATEGORY_ADD_ITEM,
  CATEGORY_CLOSE_CREATE_EDIT_DIALOG,
  CATEGORY_CLOSE_CREATE_EDIT_ITEM_DIALOG, CATEGORY_CLOSE_DELETE_DIALOG,
  CATEGORY_CREATE,
  CATEGORY_DELETE,
  CATEGORY_DELETE_ITEM,
  CATEGORY_EDIT,
  CATEGORY_EDIT_ITEM,
  CATEGORY_FETCH_ALL,
} from '../../Constants';

const initialState = {
  categories: [],
  dialogToCreateEditCategory: {
    isOpen: false,
    category: undefined,
  },
  dialogToCreateEditItem: {
    isOpen: false,
    category: undefined,
    item: undefined
  },
  dialogToDelete: {
    isOpen: false,
    category: undefined,
    item: undefined
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_FETCH_ALL:
      return {
        ...state,
       categories: action.payload
      }
    case CATEGORY_CREATE:
      return {
        ...state,
        dialogToCreateEditCategory:{
          ...state.dialogToCreateEdit,
          isOpen: true,
        }
      }
    case CATEGORY_EDIT:
      return {
        ...state,
        dialogToCreateEditCategory: {
          ...state.dialogToCreateEditCategory,
          isOpen: true,
          category: action.payload.category
        }
      }
    case CATEGORY_DELETE:
      return {
        ...state,
        dialogToDelete: {
          ...state.dialogToDelete,
          isOpen: true,
          category: action.payload.category
       }
      }
    case CATEGORY_CLOSE_CREATE_EDIT_DIALOG:
      return {
        ...state,
        dialogToCreateEditCategory: {
          isOpen: false,
          category: undefined
        }
      }
    case CATEGORY_ADD_ITEM:
      return {
        ...state,
        dialogToCreateEditItem: {
          ...state.dialogToCreateEditItem,
          isOpen: true,
          category: action.payload.category
        }
      }
    case CATEGORY_EDIT_ITEM:
      return {
        ...state,
        dialogToCreateEditItem: {
          ...state.dialogToCreateEditItem,
          isOpen: true,
          category: action.payload.category,
          item: action.payload.item
        }
      }
    case CATEGORY_DELETE_ITEM:
      return {
        ...state,
        dialogToDelete: {
          isOpen: true,
          item: action.payload.item,
          category: action.payload.category
        }
      }
    case CATEGORY_CLOSE_CREATE_EDIT_ITEM_DIALOG:
      return {
        ...state,
        dialogToCreateEditItem: {
          isOpen: false,
          category: undefined,
          item: undefined
        }
      }
    case CATEGORY_CLOSE_DELETE_DIALOG:
      return {
        ...state,
        dialogToDelete: {
          isOpen: false,
          item: undefined,
          category: undefined
        }
    }
    default:
      return state
  }
}