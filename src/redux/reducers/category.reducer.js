import {
  CATEGORY_FETCH_ALL,
} from '../../Constants';

const initialState = {
  category: {},
  categories: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_FETCH_ALL:
      return {
        ...state,
       categories: action.payload.categories
      }
    default:
      return state
  }
}