import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { signOut} from '../../redux/actions/user.actions';


const SignOut = ({ handleSignOut }) => {
  useEffect(() => {
    handleSignOut();
  });
  return (<></>);
};

const mapDispatchToProps = (dispatch) => ({
  handleSignOut: () => {
    dispatch(signOut());
  },
})

export default connect(null, mapDispatchToProps)(SignOut);
