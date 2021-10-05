import {SHOPPING_LIST_FETCH_ALL} from '../../Constants'

const initialState = {
  shoppingLists: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOPPING_LIST_FETCH_ALL:
      return {
        ...state,
        shoppingLists: action.payload.shoppingLists
      }

    default:
      return state;
  }
}