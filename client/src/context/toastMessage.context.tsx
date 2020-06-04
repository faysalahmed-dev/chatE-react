import React, { createContext, Props, useState, useCallback } from 'react';
import {type as ToastType } from '@/components/toast-message';

type ToastObj = {status: boolean, message: string, type: ToastType }

const init: ToastObj = { status: false, message: '', type: 'success'  }

type ToastContextI = {
	toastMessage: ToastObj;
	setToastMessage(obj: ToastObj, time?: number): void
}

export const ToastContext = createContext<ToastContextI>({} as ToastContextI);

export default function ToastContextProvider (props: Props<{}>) {
	const [toastMessage, setMessage] = useState(init)
	const setToastMessage = useCallback((obj: ToastObj, time?: number) => {
		setMessage(obj)
		setTimeout(() => {
			setMessage(init)
		}, time || 3000);
	}, []);
	return (
		<ToastContext.Provider value={{toastMessage, setToastMessage}}>
			{props.children}
		</ToastContext.Provider>
	)
}