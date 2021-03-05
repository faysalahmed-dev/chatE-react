import React from 'react';
import user1 from '@/assets/user-image/user-1.jpg';

const RecentChatItem: React.FC = (): JSX.Element => {
   return (
      <div
         className='active-user-item p-2 text-sm rounded-md'
         style={{ background: 'var(--secondary-bg)' }}
      >
         <div className='image relative'>
            <div className='dot-green w-3 h-3 rounded-full absolute right-0' />
            <div className='rounded-full overflow-hidden w-10 h-10'>
               <img
                  src={user1}
                  className='w-full h-full object-cover'
                  alt='user'
               />
            </div>
         </div>
         <p className='username font-bold capitalize'>Faysal Ahmed</p>
         <p className='user-message'>Lorem ipsum dolor...</p>
         <p className='time font-bold'>8:30 pm</p>
      </div>
   );
};
export default RecentChatItem;