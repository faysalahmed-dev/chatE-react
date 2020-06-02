import React, { createRef, useEffect, RefObject, useState } from 'react';

import RecentChat from '@/components/recent-chat';
import ChatClubs from '@/components/chat-clubs';

import '@/sass/dashboard.modules.scss';

const chatClub: RefObject<HTMLDivElement> = createRef();

const DashboardPage = (): JSX.Element => {
   const [asideHeight, setAsideHeight] = useState(113);
   useEffect(() => {
      setAsideHeight(chatClub.current!.offsetTop + 16);
   }, []);
   return (
      <section className='pt-10 w-full'>
         <div className='mx-auto chat-container'>
            <div
               className='rounded-lg overflow-hidden chat-aside fixed bottom-0'
               style={{
                  height: `calc(100% - ${asideHeight}px)`,
               }}
            >
               <RecentChat />
            </div>
            <div
               className='rounded-lg overflow-hidden flex-grow chat-club-section'
               ref={chatClub}
            >
               <ChatClubs />
            </div>
         </div>
      </section>
   );
};

export default DashboardPage;
