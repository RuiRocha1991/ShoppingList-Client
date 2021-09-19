import {
  USER_LOGIN, USER_LOGIN_SUCCESS
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
    default:
      return state
  }
}
