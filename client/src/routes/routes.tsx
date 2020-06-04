import React from 'react';
import { Route, Switch } from 'react-router-dom';

import HomePage from '@/pages/homePage';
import LoginPage from '@/pages/loginPage';
import Register from '@/pages/registerPage';
import DashBoard from '@/pages/dashboardPage';
import ChatClub from '@/pages/chatClub';
import NotFoundPage from '@/pages/notFoundPage';
import UnAuthenticatedPage from '@/pages/unAuthenticatedPage';


import PrivateRoute from '@/routes/PrivateRoute';
import PublicRouteOnly from '@/routes/PublicRouteOnly';

const routes: React.FC<{isAuthenticated: boolean}> = ({ isAuthenticated }) => {
	return (
		<Switch>
			<PrivateRoute exact path='/dashboard' component={DashBoard} isAuthenticated={isAuthenticated} />
			<PrivateRoute exact path='/group/:groupName' component={ChatClub} isAuthenticated={isAuthenticated} />
			<PublicRouteOnly exact path='/login' component={LoginPage} isAuthenticated={isAuthenticated}/>
			<PublicRouteOnly exact path='/register' component={Register} isAuthenticated={isAuthenticated}/>
			<PublicRouteOnly exact path="/401" component={UnAuthenticatedPage} isAuthenticated={isAuthenticated}/>
			<Route exact path='/' component={HomePage} />
	        <Route component={NotFoundPage} />
		</Switch>
	)
}

export default routes;