import React, { RefObject, createRef, useState, useCallback, useContext } from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import {
   FiSearch,
   FiBell,
   FiChevronDown,
   FiSettings,
   FiLogOut,
   FiUser,
   FiGlobe,
} from 'react-icons/fi';
import Notifation from '@/components/dropDown';

import { UserContext } from '@/context/user/user.context'

const Header = styled.header`
   background: var(--dark-light-bg);
`;

const DrowDown = styled.div`
   background: var(--dark-light-bg);
   position: absolute;
   top: 56px;
   right: -3px;
   a, div {
      transition: all 0.3s;
      &:hover {
         background: #4a5479;
      }
   }
`;
const SearchInputIconContainer = styled.div`
   top: 50%;
   transform: translatey(-50%);
   left: 10px;
`

export const headerRef: RefObject<HTMLElement> = createRef();

type Toggle<T> = keyof T 

const init = { notifation: false, message: false, manu: false }

export default (): JSX.Element => {
   const [show,setShow] = useState(init)
   const history = useHistory()
   const { isAuthenticated, user, logoutUser } = useContext(UserContext)
   const toggleShow = useCallback((key: Toggle<typeof show>) => {
      setShow(prev => ({...init, [key]: !prev[key]}))
   }, []);
   const handleLogout = useCallback(() => {
      logoutUser()
      history.replace('/')
   }, [])
   return (
      <Header
         className='flex items-center justify-between fixed top-0 py-4 w-full px-5 z-50'
         ref={headerRef}
      >
         <h3>
            <Link to='/'> ChatE </Link>
         </h3>
         {
            isAuthenticated ? (
               <div className='relative flex space-x-5 flex items-center'>
                  <div className="flex flex-col relative">
                    <input className="py-2 pl-8 pr-2 rounded-md dark-bg shadow-sm focus:outline-none"
                        name="search"
                        placeholder='Search Here...'
                        autoComplete="off"
                     />
                     <SearchInputIconContainer className='absolute icon-container'>
                        <FiSearch />
                     </SearchInputIconContainer>
                  </div>
                   <button className="relative bg-transparent outline-none border-none focus:outline-none" onClick={() => toggleShow('message')}>
                     <div className='icon-container'><FiBell /></div>
                     {show.message && <Notifation />}
                  </button>
                  <button className="relative bg-transparent outline-none border-none focus:outline-none" onClick={() => toggleShow('notifation')}>
                     <div className='icon-container'><FiGlobe /></div>
                     {show.notifation && <Notifation />}
                  </button>
                  <div className='rounded-full overflow-hidden w-10 h-10 shadow-sm'>
                     <img
                        src={user!.avatar}
                        alt={user!.name}
                        className='w-full h-full object-cover'
                     />
                  </div>
                  <button
                     className='flex items-center space-x-1 outline-none focus:outline-none border-none bg-transparent'
                     type='button'
                     onClick={() => toggleShow('manu')}
                  >
                     <span className='font-bold capitalize'>{user!.name}</span>
                     <div className='icon-container'>
                        <FiChevronDown />
                     </div>
                     <DrowDown className={`w-40 shadow-lg rounded-b-md overflow-hidden ${show.manu ? 'block': 'hidden'}`}>
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
                        <div className="px-3 py-2 flex items-center space-x-2" onClick={handleLogout}>
                             <span>
                                 <FiLogOut />
                              </span>
                           <span> Logout</span>
                        </div>
                     </DrowDown>
                  </button>
               </div>
            )
            : (
                <nav className='flex space-x-3'>
                  <Link to='/login'>Login</Link>
                  <Link to='/register'>Register</Link>
               </nav>
            )
         }
        
         
      </Header>
   );
};
