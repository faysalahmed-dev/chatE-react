import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PublicRouteProps extends  RouteProps {
	isAuthenticated: boolean
}

const PublicRouteOnly: React.FC<PublicRouteProps> = ({ component: Component, isAuthenticated, ...rest }) =>  {
  return (
    <Route {...rest} render={(routeProps) =>
    	// @ts-ignore
        isAuthenticated ? <Redirect to="/404" /> : <Component {...routeProps} />
      }
    />
  );
}

export default PublicRouteOnly;