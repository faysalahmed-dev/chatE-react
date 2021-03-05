import React from 'react';
import { FiLink } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { userDataSelector } from '@/app/selectors/user.selector';

export default (): JSX.Element => {
   const user = useSelector(userDataSelector);
   return (
      <div className='text-center dark-light-bg rounded-lg py-3 flex flex-col shadow-md'>
         <div className='rounded-full w-32 h-32 mx-auto shadow-lg overflow-hidden border-purple-600 border-2'>
            <img
               src={user!.avater}
               alt={user!.name}
               className='block w-full h-full object-cover'
            />
         </div>
         <h3 className='font-bold text-xl mt-3 mb-1'>{user!.name}</h3>
         <p className='opacity-75'>Chittagon, Bangladesh</p>
         <div className='mt-auto py-4'>
            <a
               href='/'
               className='text-blue-400 flex items-center justify-center hover:underline'
            >
               <span className='inline-block mr-2'>
                  <FiLink />
               </span>
               View My Profile
            </a>
         </div>
      </div>
   );
};
