import React from 'react';
import { ReactComponent as Logo } from '@/assets/logo.svg';

export default () => {
   return (
      <h3 className='font-bold flex justify-center items-center text-xl'>
         <Logo className='w-12 h-16 inline-block mr-2' />
         <span className='text-green-500'>Chat</span>
         <span className='text-yellow-500'>E</span>
      </h3>
   );
};
