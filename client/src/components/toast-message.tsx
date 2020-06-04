import React from 'react';

export type type = 'success'| 'error'

const ToastMessage:React.FC<{type: string}> = ({ children, type }) => {
	const cls = `text-center py-3 rounded-full px-5 absolute capitalize ${type === 'success' ? 'bg-green-500': 'bg-red-500'}`
	return (
		<div className={cls} style={{
			left: "50%",
			transform: "translatex(-50%)",
			top: '25px',
			zIndex: 1000
		}}>
		  	{ children }
		</div>
	)
}

export default ToastMessage;