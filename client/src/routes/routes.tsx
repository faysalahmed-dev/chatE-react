import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from '@/pages/homePage';
import LoginPage from '@/pages/loginPage';
import Register from '@/pages/registerPage';
import DashBoard from '@/pages/dashboardPage';
import ChatGroup from '@/pages/chatGroup';
import NotFoundPage from '@/pages/notFoundPage';
import UnAuthenticatedPage from '@/pages/unAuthenticatedPage';
import ProfilePage from '@/pages/profile'

import PrivateRoute from '@/routes/PrivateRoute';
import PublicRouteOnly from '@/routes/PublicRouteOnly';

const routes: React.FC<{ isAuthenticated: boolean }> = ({
   isAuthenticated,
}) => {
   return (
      <Switch>
         <PrivateRoute
            exact
            path='/dashboard'
            isAuthenticated={isAuthenticated}
         >
            <DashBoard />
         </PrivateRoute>

         <PrivateRoute
            exact
            path='/group/:groupName'
            isAuthenticated={isAuthenticated}
         >
            <ChatGroup />
         </PrivateRoute>

         <PublicRouteOnly exact path='/login' isAuthenticated={isAuthenticated}>
            <LoginPage />
         </PublicRouteOnly>

         <PublicRouteOnly
            exact
            path='/register'
            isAuthenticated={isAuthenticated}
         >
            <Register />
         </PublicRouteOnly>

         <PrivateRoute
            exact
            path='/profile'
            isAuthenticated={isAuthenticated}
         >
            <ProfilePage />
         </PrivateRoute>

         <PublicRouteOnly
            exact
            path='/401'
            component={UnAuthenticatedPage}
            isAuthenticated={isAuthenticated}
         >
            <UnAuthenticatedPage />
         </PublicRouteOnly>

         <Route
            exact
            path='/'
            component={HomePage}
            isAuthenticated={isAuthenticated}
         />

         <Route component={NotFoundPage} />
      </Switch>
   );
};

export default routes;
