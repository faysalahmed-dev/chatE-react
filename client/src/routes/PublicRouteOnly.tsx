import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PublicRouteProps extends RouteProps {
   isAuthenticated: boolean;
}

const PublicRouteOnly: React.FC<PublicRouteProps> = ({
   children,
   isAuthenticated,
   ...rest
}) => {
   return (
      <Route
         {...rest}
         render={routeProps =>
            // @ts-ignore
            isAuthenticated ? <Redirect to='/404' /> : children
         }
      />
   );
};

export default PublicRouteOnly;
