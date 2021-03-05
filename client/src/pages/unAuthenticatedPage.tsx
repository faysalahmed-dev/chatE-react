import React from 'react';
import { Link, useLocation, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { History } from 'history';

import { isAuthenticatedSelector } from '@/app/selectors/user.selector';

interface HistoryState extends History {
	from: {
		pathname: string
	} | undefined
}

const UnAuth: React.FC = () => {
	const { state } = useLocation<HistoryState>();
	const isAuthenticated = useSelector(isAuthenticatedSelector)
	if(isAuthenticated) {
		if(state && state.from) return <Redirect to={state.from.pathname} />
		else return <Redirect to="/" />
	}
	return (
		<div className="w-full h-full flex flex-col justify-center items-center container mx-auto capitalize">
			<div>
				<h1 style={{fontSize: '100px'}}>401</h1><br />
				<p className="text-3xl">Access Denided. :-( </p>
				<p className="mt-3 mb-4">Your are not loggedin. please Login to access this page</p>
				<Link to={'/login' + (state && state.from ? `?redirect=${state.from.pathname}`: '')} 
					className="secondary-bg p-2 inline-block">
					Login Now
				</Link> or 
				<Link to={'/register' + (state && state.from ? `?redirect=${state.from.pathname}`: '')}
					className="ml-1 secondary-bg p-2 inline-block">
					Register Now
				</Link>
			</div>
		</div>
	)
}

export default UnAuth;