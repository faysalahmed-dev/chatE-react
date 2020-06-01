import React, { RefObject, createRef, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
   FiSearch,
   FiBell,
   FiChevronDown,
   FiSettings,
   FiLogOut,
   FiUser,
} from 'react-icons/fi';

import user1 from '@/assets/user-image/user-1.jpg';

import InputGroup from '@/components/input-group';

const Header = styled.header`
   background: var(--dark-light-bg);
`;

const DrowDown = styled.div`
   background: var(--dark-light-bg);
   position: absolute;
   top: 56px;
   right: -3px;
   a {
      transition: all 0.3s;
      &:hover {
         background: #4a5479;
      }
   }
`;

export const headerRef: RefObject<HTMLElement> = createRef();

export default (): JSX.Element => {
   const [toggle, setToggle] = useState(false);
   return (
      <Header
         className='flex items-center justify-between fixed top-0 py-4 w-full px-5 z-50'
         ref={headerRef}
      >
         <h3>
            <Link to='/'> ChatE </Link>
         </h3>
         <nav className='flex space-x-3' style={{ display: 'none' }}>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
         </nav>
         <div className='relative flex space-x-3 flex items-center'>
            <InputGroup
               name='some'
               placeholder='Search Here...'
               style={{ background: 'var(--dark-bg)', paddingLeft: '35px' }}
            >
               <div
                  className='absolute icon-container'
                  style={{
                     top: '50%',
                     transform: 'translatey(-50%)',
                     left: '10px',
                  }}
               >
                  <FiSearch />
               </div>
            </InputGroup>
            <div className='icon-container'>
               <FiBell />
            </div>
            <div className='rounded-full overflow-hidden w-10 h-10 shadow-sm'>
               <img src={user1} alt='user' className="w-full h-full object-cover"/>
            </div>

            <button
               className='flex items-center space-x-1 outline-none focus:outline-none border-none bg-transparent'
               type='button'
               onClick={() => setToggle(!toggle)}
            >
               <span className='font-bold'>Faysal Ahmed</span>
               <div className='icon-container'>
                  <FiChevronDown />
               </div>
               {toggle && (
                  <DrowDown className='w-40 shadow-lg rounded-b-md'>
                     <Link
                        to='/'
                        className='px-3 py-2 flex items-center space-x-2'
                     >
                        <span>
                           <FiUser />
                        </span>
                        <span>profile</span>
                     </Link>
                     <Link
                        to='/'
                        className='px-3 py-2 flex items-center space-x-2'
                     >
                        <span>
                           <FiSettings />
                        </span>
                        <span>setting</span>
                     </Link>
                     <Link
                        to='/'
                        className='px-3 py-2 flex items-center space-x-2'
                     >
                        <span>
                           <FiLogOut />
                        </span>
                        <span> Logout</span>
                     </Link>
                  </DrowDown>
               )}
            </button>
         </div>
      </Header>
   );
};
