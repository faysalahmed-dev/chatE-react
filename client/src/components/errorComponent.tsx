import React from 'react';
import {Link} from 'react-router-dom';

type Props = {
	statusCode: number;
	message: string;
	navigateTo: string;
	navigateText: string
}

const ErrorComponent: React.FC<Props> = ({statusCode, message,navigateTo,navigateText}) => {
	return (
		<div className="w-full h-full flex flex-col justify-center items-center container mx-auto">
			<div>
				<h1 style={{fontSize: '100px'}}>{statusCode}</h1><br />
				<p className="text-3xl">{message}</p>
				<Link to={navigateTo} className="mt-3 secondary-bg p-2 inline-block"> {navigateText}</Link>
			</div>
		</div>
	)
}

export default ErrorComponent;