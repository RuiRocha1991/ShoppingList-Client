import {
  UI_FETCHING_FALSE,
  UI_FETCHING_TRUE,
} from '../../Constants';

const initialState = {
  isFetching: false,
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
        isFetching: false,
        redirect: null
      }
    default:
      return state

  }
}
