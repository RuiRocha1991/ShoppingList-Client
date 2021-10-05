import React from 'react';
import {Redirect, Switch} from 'react-router-dom';

import {RouteWithLayout} from './components';
import {Main as MainLayout, Minimal as MinimalLayout} from './layouts';

import {
  Maintenance as MaintenanceView,
  NotFound as NotFoundView,
  SignIn as SignInView,
  SignOut as SignOutView,
  ShoppingList as ShoppingListView,
  Items as ItemsView
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-in"
      />
      <RouteWithLayout
          isProtected={false}
          component={MaintenanceView}
          exact
          layout={MinimalLayout}
          path="/maintenance"
      />
      <RouteWithLayout
          isProtected={false}
          component={SignInView}
          exact
          layout={MinimalLayout}
          path="/sign-in"
      />
      <RouteWithLayout
          isProtected={true}
          component={ShoppingListView}
          exact
          layout={MainLayout}
          path="/shopping-list"
      />
      <RouteWithLayout
          isProtected={true}
          component={ItemsView}
          exact
          layout={MainLayout}
          path="/items"
      />
      <RouteWithLayout
          isProtected={true}
          component={SignOutView}
          exact
          layout={MinimalLayout}
          path="/sign-out"
      />
      <RouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
