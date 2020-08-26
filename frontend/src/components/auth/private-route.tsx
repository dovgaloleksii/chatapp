import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthContext } from './context';

export const PrivateRoute: React.FunctionComponent<RouteProps> = ({ component, ...rest }) => {
  const { isAuthenticated } = useAuthContext();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          React.createElement(component as React.FunctionComponent, props as React.Attributes)
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
