import React, { useRef, useEffect, useState } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import HomePage from '@/pages/homePage';
import LoginPage from '@/pages/loginPage';
import Register from '@/pages/registerPage';
import DashBoard from '@/pages/dashboardPage';
import ChatClub from '@/pages/chatClub';

import NavBar, { headerRef } from '@/components/nav-bar';

const App = (): JSX.Element => {
   const some = useRef(headerRef);
   const [headerHeight, setHeaderHeight] = useState(57);

   useEffect(() => {
      setHeaderHeight(some.current.current!.clientHeight);
   }, []);
   return (
      <BrowserRouter>
         <NavBar />
         <main
            className='grid'
            style={{
               marginTop: `${headerHeight}px`,
               minHeight: `calc(100vh - ${`${headerHeight}px`})`,
            }}
         >
            <Switch>
               <Route path='/login' component={LoginPage} />
               <Route path='/register' component={Register} />
               <Route path='/dashboard' component={DashBoard} />
               <Route path='/group/:groupName' component={ChatClub} />
               <Route path='/' component={HomePage} />
            </Switch>
         </main>
      </BrowserRouter>
   );
};

export default App;
