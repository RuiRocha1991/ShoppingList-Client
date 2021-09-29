import { push } from 'react-router-redux';
import {
  USER_ADD_TOKEN,
  USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS
} from '../../Constants';
import {
  fetchStart,
  fetchStop, errorMessage, showErrorMessage
} from './ui.actions';
import axios from "axios";
import store from "../store";

//#region AuthActions
export const googleAuthSignInSuccess =  (response) => async (dispatch) => {
  const user = response.profileObj;
  dispatch(fetchStart());
  axios({
    method: 'POST',
    url: `${process.env.REACT_APP_SERVER_URL}/auth/google`,
    data: {tokenId: response.tokenObj.id_token},
    withCredentials: true
  }).then(response => {
    if (response.status === 200) {
      console.log(response.data.token)
      const email = user.email;
      const {displayName, image} = response.data.user;
      dispatch(signInSuccess({name:displayName, email, image}));
      dispatch(addToken(response.data.token));
      dispatch(fetchStop());
      // make a dispacth to add token to store
      dispatch(push('/dashboard'));
    }
  }).catch(err => {
    dispatch(errorMessage(err));
  });
}

const signInSuccess = (data) => ({
  type: USER_LOGIN_SUCCESS,
  payload: data
});

export const googleAuthSignInFailure = (response) =>(dispatch) => {
  dispatch(showErrorMessage(response));
  console.log(response);
}
export const signOut = () => (dispatch) => {
  const token = store.getState().user.token;
  axios({
    method: 'GET',
    url: `${process.env.REACT_APP_SERVER_URL}/auth/logout`,
    withCredentials: true,
    headers: { token },
  }).then(response => {
    if (response.status === 200) {
      dispatch(signOutSuccess());
      dispatch(push('/sign-in'))
    }
  }).catch(err => {
    dispatch(errorMessage(err));
    dispatch(signOutSuccess());
    dispatch(push('/sign-in'));
  })
};

export const signOutSuccess = () => (dispatch) => {
  dispatch({type: USER_LOGOUT_SUCCESS});
};


export const addToken = (token) => (dispatch) => {
  if (store.getState().user.token !== token){
  dispatch({type: USER_ADD_TOKEN, payload: token});
  }
};
//#endregion