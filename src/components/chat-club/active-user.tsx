import React from 'react';

import {FiUsers} from 'react-icons/fi'
import user1 from '@/assets/user-image/user-1.jpg';
import user2 from '@/assets/user-image/user-2.jpg';
import user3 from '@/assets/user-image/user-3.jpg';


export default (): JSX.Element => {
   return (
      <section className='dark-light-bg shadow-md rounded-lg px-3'>
          <div className="flex items-center py-6  border-b border-blue-800">
             <div className="icon-container mr-2">
               <FiUsers />
             </div>
             <span>Online User 2</span>
          </div>
          <div className="px-2 py-3 space-y-2">

             <div className="flex items-center py-2 px-3 secondary-bg rounded-lg">
               <div className='relative w-10 h-10'>
                  <div className='dot-green w-3 h-3 rounded-full absolute right-0' />
                  <img
                     src={user1}
                     className='w-full h-full object-cover rounded-full'
                     alt='user'
                  />
               </div>
               <p className="ml-2">Faysal Ahmed</p>
             </div>

              <div className="flex items-center py-2 px-3 secondary-bg rounded-lg">
               <div className='relative w-10 h-10'>
                  <div className='dot-green w-3 h-3 rounded-full absolute right-0' />
                  <img
                     src={user2}
                     className='w-full h-full object-cover rounded-full'
                     alt='user'
                  />
               </div>
               <p className="ml-2">Kaif Ahmed</p>
             </div>

              <div className="flex items-center py-2 px-3 secondary-bg rounded-lg">
               <div className='relative w-10 h-10'>
                  <div className='dot-green w-3 h-3 rounded-full absolute right-0' />
                  <img
                     src={user3}
                     className='w-full h-full object-cover rounded-full'
                     alt='user'
                  />
               </div>
               <p className="ml-2">Tanha</p>
             </div>

              <div className="flex items-center py-2 px-3 secondary-bg rounded-lg">
               <div className='relative w-10 h-10'>
                  <div className='dot-green w-3 h-3 rounded-full absolute right-0' />
                  <img
                     src={user1}
                     className='w-full h-full object-cover rounded-full'
                     alt='user'
                  />
               </div>
               <p className="ml-2">Faysal Ahmed</p>
             </div>

              <div className="flex items-center py-2 px-3 secondary-bg rounded-lg">
               <div className='relative w-10 h-10'>
                  <div className='dot-green w-3 h-3 rounded-full absolute right-0' />
                  <img
                     src={user2}
                     className='w-full h-full object-cover rounded-full'
                     alt='user'
                  />
               </div>
               <p className="ml-2">Kaif Ahmed</p>
             </div>
          </div>
      </section>
   );
};
