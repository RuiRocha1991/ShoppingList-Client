import {
  CATEGORY_FETCH_ALL,
} from '../../Constants';

const initialState = {
  categoryToEdit: undefined,
  categories: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_FETCH_ALL:
      console.log(action.payload)
      return {
        ...state,
       categories: action.payload
      }
    default:
      return state
  }
}