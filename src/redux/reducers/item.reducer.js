import {
  ITEM_CLOSE_DIALOG,
  ITEM_FETCH_ALL, ITEM_OPEN_DIALOG,
} from '../../Constants';

const initialState = {
  selectedItem: undefined,
  items: {
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
          items: action.payload.items,
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
    default:
      return state
  }
}