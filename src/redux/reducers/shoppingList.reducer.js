import {
  SHOPPING_LIST_CREATE_EDIT_CLOSE,
  SHOPPING_LIST_CREATE_OPEN, SHOPPING_LIST_EDIT_OPEN,
  SHOPPING_LIST_FETCH_ALL, SHOPPING_LIST_FETCH_ALL_SUCCESS,
  SHOPPING_LIST_FETCHING_CATEGORIES_FALSE,
  SHOPPING_LIST_FETCHING_CATEGORIES_TRUE
} from '../../Constants'

const initialState = {
  shoppingLists: [],
  dialogToCreateEditList: {
    isOpen: false,
    shoppingList: undefined,
  },
  categories: {
    isFetching: false,
    data: []
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOPPING_LIST_FETCH_ALL:
      return {
        ...state,
        shoppingLists: action.payload.shoppingLists
      }
    case SHOPPING_LIST_CREATE_OPEN:
      return {
        ...state,
        dialogToCreateEditList: {
          ...state.dialogToCreateEditList,
          isOpen: true,
        }
      }
    case SHOPPING_LIST_CREATE_EDIT_CLOSE:
      return {
        ...state,
        dialogToCreateEditList: {
          ...state.dialogToCreateEditList,
          shoppingList: undefined,
          isOpen: false,
        }
      }
    case SHOPPING_LIST_FETCHING_CATEGORIES_TRUE:
      return {
        ...state,
        categories: {
          ...state.categories,
          isFetching: true
        }
      }
    case SHOPPING_LIST_FETCHING_CATEGORIES_FALSE:
      return {
        ...state,
        categories: {
          isFetching: false,
          data: action.payload.categories.categories
        }
      }
    case SHOPPING_LIST_FETCH_ALL_SUCCESS:
      return {
        ...state,
        shoppingLists: action.payload
      }
    case SHOPPING_LIST_EDIT_OPEN:
      return {
        ...state,
        dialogToCreateEditList: {
          isOpen: true,
          shoppingList: action.payload,
        },
      }
    default:
      return state;
  }
}