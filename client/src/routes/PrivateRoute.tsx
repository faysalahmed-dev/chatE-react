import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends  RouteProps {
	isAuthenticated: boolean
}

const PrivateRouteOnly: React.FC<PrivateRouteProps> = ({ component: Component, isAuthenticated, ...rest }) =>  {
  return (
    <Route {...rest} render={(routeProps) =>
    	// @ts-ignore
        isAuthenticated ? <Component {...routeProps} /> : (
          <Redirect to={{ pathname: "/401", state: { from: routeProps.location } }} />
        )
      }
    />
  );
}

export default PrivateRouteOnly;