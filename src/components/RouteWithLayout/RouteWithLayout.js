import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import { push } from 'react-router-redux';

const RouteWithLayout = props => {
  const { layout: Layout, component: Component, isProtected, isLogged, authenticatedRedirect, nonAuthenticatedRedirect, ...rest } = props;

  if (isProtected && !isLogged) {
    nonAuthenticatedRedirect();
  }

  if(isProtected !== undefined && !isProtected && isLogged) {
    authenticatedRedirect();
  }

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

RouteWithLayout.propTypes = {
  authenticatedRedirect: PropTypes.func.isRequired,
  component: PropTypes.any.isRequired,
  isLogged: PropTypes.bool.isRequired,
  isProtected: PropTypes.bool.isRequired,
  layout: PropTypes.any.isRequired,
  nonAuthenticatedRedirect: PropTypes.func.isRequired,
  path: PropTypes.string
};

const mapStateToProps = (state) => ({
  isLogged: state.user.isAuthenticated
});
const mapDispatchToProps = (dispatch) => ({
  nonAuthenticatedRedirect: () => {
    dispatch(push('/sign-in'));
  },
  authenticatedRedirect: () => {
    dispatch(push('/shopping-list'));
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(RouteWithLayout);
