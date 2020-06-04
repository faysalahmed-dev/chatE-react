import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as serviceWorker from './serviceWorker';

import UserProvider from '@/context/user/user.context';
import ToastMessageProvider from '@/context/toastMessage.context';

import './assets/css/main.css';
import './assets/css/loader.css';
import './sass/styles.scss';

ReactDOM.render(
   <React.StrictMode>
    	<UserProvider>
	      	<ToastMessageProvider>
	      		<App />
	       	</ToastMessageProvider>
      	</UserProvider>
   </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
