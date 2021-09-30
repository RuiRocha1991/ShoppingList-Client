import {
  ITEM_FETCH_ALL,
} from '../../Constants';

const initialState = {
  selectedItem: undefined,
  items: {
    totalItems: 0,
    items: [],
    totalPages: 0,
    currentPage: 0
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ITEM_FETCH_ALL:
      return {
        ...state,
        items: {
          ...state.items,
          items: action.payload,
        }
      }
    default:
      return state
  }
}