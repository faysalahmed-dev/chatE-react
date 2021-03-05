import React, { useEffect, useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Routes from '@/routes/routes';

import NavBar from '@/components/nav-bar';
import ToastMessage from '@/components/toast-message';

import { ToastContext } from '@/context/toastMessage.context';
import { fetchUser } from './actions/user.action';
import { authStateSelector } from './selectors/user.selector';

const App = (): JSX.Element => {
   const { toastMessage } = useContext(ToastContext);
   const { isAuthenticated, loading } = useSelector(authStateSelector);
   const dispatch = useDispatch();

   useEffect(() => {
      if (!isAuthenticated) {
         dispatch(fetchUser());
      }
   }, []);

   if (loading)
      return (
         <div className='w-full h-screen flex items-center justify-center'>
            <div className='dot-spin'></div>
         </div>
      );

   return (
      <BrowserRouter>
         {toastMessage.status && (
            <ToastMessage type={toastMessage.type}>
               {toastMessage.message}
            </ToastMessage>
         )}
         <NavBar isAuthenticated={isAuthenticated} />
         <main
            className='grid'
            style={{
               minHeight: `calc(100vh - var(--header-height))`,
               marginTop: 'var(--header-height)',
            }}
         >
            <Routes isAuthenticated={isAuthenticated} />
         </main>
      </BrowserRouter>
   );
};

export default App;
