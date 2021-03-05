import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import ToastMessageProvider from '@/context/toastMessage.context';
import SocketProvider from '@/context/socket.context';

import { Provider } from 'react-redux';
import store from './app/store';

import './assets/css/main.css';
import './assets/css/loader.css';
import './sass/styles.scss';

const render = () => {
   const App = require('./app/App').default;

   ReactDOM.render(
      <Provider store={store}>
         <SocketProvider>
            <ToastMessageProvider>
               <App />
            </ToastMessageProvider>
         </SocketProvider>
      </Provider>,
      document.getElementById('root')
   );
};
render();

// @ts-ignore
if (process.env.NODE_ENV === 'development' && module.hot) {
   // @ts-ignore
   module.hot.accept('./app/App', render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
