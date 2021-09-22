import {
  USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS
} from '../../Constants';

const initialState = {
  id: '',
  googleId: '',
  name: '',
  email: '',
  isAuthenticated: false,
  image: '',
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
        id: '',
        googleId: '',
        name: '',
        email: '',
        isAuthenticated: false,
        image: '',
      }
    default:
      return state
  }
}
