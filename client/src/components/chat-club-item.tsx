import React from 'react';
import { FiStar, FiMapPin, FiPlus } from 'react-icons/fi';
import '@/sass/chat-club-item.modules.scss';

import RealMadriad from '@/assets/club-image/real-madriad.png';
import user1 from '@/assets/user-image/user-1.jpg';
import user2 from '@/assets/user-image/user-2.jpg';
import user3 from '@/assets/user-image/user-3.jpg';

export default ({ style }: { style?: React.CSSProperties }): JSX.Element => {
   return (
      <div
         className='relative p-3 rounded-lg chat-item inline-block'
         style={style}
      >
         <span className='absolute bookmark-icon club-icon'>
            <FiStar />
         </span>
         <div className='w-24 h-32 mx-auto'>
            <img src={RealMadriad} alt='Real Madriad' />
         </div>
         <div className='mt-3'>
            <h5 className='text-center font-bold text-2xl'>Real Madrid</h5>
            <div className='text-center mt-2'>
               <div className='flex items-center justify-center'>
                  <span className='inline-block mr-2 club-icon'>
                     <FiMapPin />
                  </span>
                  <span>Madrid, Spian</span>
               </div>
               <span className='block text-sm'>public</span>
            </div>
            <div className='flex justify-between items-center mt-4'>
               <div className='inline-flex flex-wrap relative -space-x-3 relative'>
                  <div className='w-8 h-8 overflow-hidden rounded-full joinded-user-image'>
                     <img
                        src={user1}
                        alt='Faysal Ahmed'
                        className='w-full h-full object-cover'
                     />
                  </div>
                  <div className='w-8 h-8 overflow-hidden rounded-full joinded-user-image'>
                     <img
                        src={user2}
                        alt='Tanha'
                        className='w-full h-full object-cover'
                     />
                  </div>
                  <div className='w-8 h-8 overflow-hidden rounded-full joinded-user-image'>
                     <img
                        src={user3}
                        alt='tara'
                        className='w-full h-full object-cover'
                     />
                  </div>
                  <span className='absolute text-sm chat-club-mamber'>
                     2k more...
                  </span>
               </div>
               <button
                  className='flex px-2 py-1 items-center rounded text-sm'
                  type='button'
               >
                  Join
                  <FiPlus />
               </button>
            </div>
         </div>
      </div>
   );
};
