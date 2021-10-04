import {
  ITEM_CHANGE_PAGE_ON_TABLE,
  ITEM_CHANGE_ROWS_PER_PAGE_ON_TABLE,
  ITEM_CLOSE_DIALOG,
  ITEM_FETCH_ALL,
  ITEM_OPEN_DIALOG,
} from '../../Constants';

const initialState = {
  selectedItem: undefined,
  items: {
    rowsPerPage: 10,
    totalItems: 0,
    items: [],
    totalPages: 0,
    currentPage: 0
  },
  currentCategories: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ITEM_FETCH_ALL:
      return {
        ...state,
        items: {
          ...state.items,
          totalItems: action.payload.items.totalDocs,
          totalPages: action.payload.items.totalPages,
          currentPage: action.payload.items.page - 1,
          items: action.payload.items.docs,
        },
        currentCategories: action.payload.categories,
      }
    case ITEM_OPEN_DIALOG:
      return {
        ...state,
        selectedItem: action.payload,
      }
      case ITEM_CLOSE_DIALOG:
      return {
        ...state,
        selectedItem: undefined,
      }
    case ITEM_CHANGE_PAGE_ON_TABLE:
      return {
        ...state,
        items: {
          ...state.items,
          currentPage: action.payload
        }
      }
    case ITEM_CHANGE_ROWS_PER_PAGE_ON_TABLE:
      return {
        ...state,
        items: {
          ...state.items,
          rowsPerPage: action.payload
        }
    }
    default:
      return state
  }
}