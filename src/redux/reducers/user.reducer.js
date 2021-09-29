import {
  USER_ADD_TOKEN,
  USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS
} from '../../Constants';

const initialState = {
  name: '',
  email: '',
  isAuthenticated: false,
  image: '',
  token: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true
      }
    case USER_LOGOUT_SUCCESS:
      return {
        ...state,
        name: '',
        email: '',
        isAuthenticated: false,
        image: '',
      }
    case USER_ADD_TOKEN:
      return {
        ...state,
       token: action.payload
      }
    default:
      return state
  }
}
