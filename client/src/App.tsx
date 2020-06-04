import React, { useRef, useEffect, useState,useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';

import NavBar, { headerRef } from '@/components/nav-bar';
import ToastMessage from '@/components/toast-message';
import { ToastContext } from '@/context/toastMessage.context';
import { UserContext } from '@/context/user/user.context';
import { getAuthUser } from '@/context/user/user.actions'
import Routes from '@/routes/routes'; 

const App = (): JSX.Element => {
   const header = useRef(headerRef);
   const [headerHeight, setHeaderHeight] = useState(57);
   const { toastMessage } = useContext(ToastContext);
   const { setUser, isAuthenticated, authStateLoaded } = useContext(UserContext);
   useEffect(() => {
      if(header.current.current) {
         setHeaderHeight(header.current.current!.clientHeight);
      }
      if(!isAuthenticated) {
         getAuthUser().then((data) => setUser(data))
      }
   }, []);

   if(!authStateLoaded) return (
      <div className="w-full h-screen flex items-center justify-center">
         <div className="dot-spin"></div>
      </div>
   )

   return (
         <BrowserRouter>
            {
               toastMessage.status && 
                  <ToastMessage type={toastMessage.type}>
                     {toastMessage.message}
                  </ToastMessage>
            }
            <NavBar />
            <main className='grid' style={{
                  marginTop: `${headerHeight}px`,
                  minHeight: `calc(100vh - ${`${headerHeight}px`})`,
               }}
            >
               <Routes isAuthenticated={isAuthenticated}/>
            </main>
         </BrowserRouter>
   );
};

export default App;
