import {
  ITEM_FETCH_ALL,
} from '../../Constants';

const initialState = {
  selectedItem: undefined,
  items: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ITEM_FETCH_ALL:
      return {
        ...state,
        items: action.payload
      }
    default:
      return state
  }
}