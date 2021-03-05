import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface Props {
   showPass: boolean;
   onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export default ({ showPass, onClick }: Props) => {
   return (
      <button
         type='button'
         className='absolute'
         onClick={onClick}
         style={{
            top: '50%',
            transform: 'translateY(-50%)',
            right: '10px',
         }}
      >
         {showPass ? <FaEye className='w-5' /> : <FaEyeSlash className='w-5' />}
      </button>
   );
};
