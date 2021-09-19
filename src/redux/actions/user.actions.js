import { push } from 'react-router-redux';
import {
  USER_LOGIN, USER_LOGIN_SUCCESS
} from '../../Constants';
import {
  fetchSignInStart,
  fetchSignInStop
} from './ui.actions';


const delay = ms => new Promise(res => setTimeout(res, ms));

//#region AuthActions
export const googleAuthSignInSuccess =  (response) => async (dispatch) => {
  const user = response.profileObj;
  dispatch(fetchSignInStart());
  await delay(5000).then(() => {
    dispatch(signInSuccess({
      id: '123kjnd32',
      name: user.name,
      googleId: user.googleId,
      email: user.email,
      image: user.imageUrl,
    }));
    dispatch(fetchSignInStop());
    dispatch(push('/tests'))
  });

}

const signInSuccess = (data) => ({
  type: USER_LOGIN_SUCCESS,
  payload: data
});

export const googleAuthSignInFailure = (response) => {
  console.log(response);
}
/*
export const signOut = () => (dispatch) => {
  dispatch(fetchSignOut());
  axios({
    method: 'GET',
    url: 'http://localhost:3001/auth/logout',
    withCredentials: true
  }).then(response => {
    if (response.status === 200) {
      dispatch(signOutSuccess());
      dispatch(push('/sign-in'))
    }
  }).catch(err => {
    console.error(err);
  })
};*/

//#endregion