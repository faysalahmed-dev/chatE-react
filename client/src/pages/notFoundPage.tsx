import React from 'react';
import { Link } from 'react-router-dom';

const notFoundPage: React.FC = () => {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center container mx-auto">
			<div>
				<h1 style={{fontSize: '100px'}}>404</h1><br />
				<p className="text-3xl">Oppppps. Page Not Fond :-( </p>
				<Link to="/" className="mt-3 secondary-bg p-2 inline-block">Back To Home</Link>
			</div>
		</div>
	)
}

export default notFoundPage;