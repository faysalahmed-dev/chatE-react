import React, { useState, useCallback } from 'react';
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
   FiCheck,
   FiX,
} from 'react-icons/fi';

import { useSelector, useDispatch } from 'react-redux';
import Logo from '@/components/logo';
import Notifation from '@/components/dropDown';
import {
   resetNotificationCount,
   removeNotification,
} from '@/app/slices/notifications.slice';
import { acceptFriend, rejectFriend } from '@/app/actions/user.action';

import { userDataSelector } from '@/app/selectors/user.selector';
import { notificationsSelector } from '@/app/selectors/notifications.selector';
import ManuDropDown from '@/components/sheard/manu-drop-down';

const Header = styled.header`
   background: var(--dark-light-bg);
   height: 70px;
`;
const SearchInputIconContainer = styled.div`
   top: 50%;
   transform: translatey(-50%);
   left: 10px;
`;

const NotifationCount = styled.span`
   top: -14px;
   right: -10px;
`;

type Toggle<T> = keyof T;

const init = { notifation: false, message: false, manu: false };

type Props = {
   isAuthenticated: boolean;
};
const itemCls = 'px-3 py-2 flex items-center space-x-2';

const NavBar: React.FC<Props> = ({ isAuthenticated }): JSX.Element => {
   const [show, setShow] = useState(init);
   const history = useHistory();
   const dispatch = useDispatch();
   const user = useSelector(userDataSelector);
   const notifications = useSelector(notificationsSelector);
   const toggleShow = useCallback(
      (key: Toggle<typeof show>) =>
         setShow(prev => ({ ...init, [key]: !prev[key] })),
      []
   );
   const handleLogout = useCallback(() => {
      dispatch({ type: 'LOGOUT_USER' });
      history.replace('/');
   }, []);
   return (
      <Header className='flex items-center justify-between fixed top-0 w-full px-5 z-50'>
         <Link to='/'>
            <Logo />
         </Link>
         {isAuthenticated ? (
            <div className='relative space-x-5 flex items-center'>
               <div className='flex flex-col relative'>
                  <input
                     className='py-2 pl-8 pr-2 rounded-md dark-bg shadow-sm focus:outline-none'
                     name='search'
                     placeholder='Search Here...'
                     autoComplete='off'
                  />
                  <SearchInputIconContainer className='absolute icon-container'>
                     <FiSearch />
                  </SearchInputIconContainer>
               </div>
               <button
                  className='relative bg-transparent outline-none border-none focus:outline-none'
                  onClick={() => {
                     toggleShow('message');
                  }}
               >
                  <div className='icon-container'>
                     <FiBell />
                  </div>
                  {show.message && <Notifation />}
               </button>
               <div className='relative'>
                  <button
                     className='bg-transparent outline-none border-none focus:outline-none'
                     onClick={e => {
                        toggleShow('notifation');
                        dispatch(resetNotificationCount());
                     }}
                  >
                     <div className='icon-container'>
                        <FiGlobe />
                     </div>
                  </button>
                  {notifications.count > 0 && (
                     <NotifationCount className='absolute h-5 w-5 rounded-full text-xs bg-red-500 inline-block text-center'>
                        {notifications.count}
                     </NotifationCount>
                  )}
                  {show.notifation && (
                     <Notifation>
                        {Object.keys(notifications.notifications).length > 0 ? (
                           Object.values(notifications.notifications).map(
                              (item, index) => (
                                 <div
                                    className='flex w-11/12 items-center border-blue-800 border-b pb-2'
                                    key={index}
                                 >
                                    <div className='h-8 w-8 rounded-full overflow-hidden'>
                                       <img
                                          className='h-full w-full'
                                          src={item!.avater}
                                          alt={item!.name}
                                       />
                                    </div>
                                    <div className='flex flex-col text-left ml-2 flex-1'>
                                       <p>{item!.name}</p>
                                       <span className='text-xs opacity-75'>
                                          Send you friend request
                                       </span>
                                    </div>
                                    <div className='space-x-1 flex'>
                                       <button
                                          onClick={() => {
                                             dispatch(acceptFriend(item!.id));
                                          }}
                                          className='w-5 h-5 rounded-full bg-green-500 flex items-center justify-center'
                                       >
                                          <FiCheck />
                                       </button>
                                       <button
                                          onClick={() =>
                                             dispatch(rejectFriend(item!.id))
                                          }
                                          className='w-5 h-5 rounded-full bg-red-500 flex items-center justify-center'
                                       >
                                          <FiX />
                                       </button>
                                    </div>
                                 </div>
                              )
                           )
                        ) : (
                           <span className='mt-5'>No Notifation Found</span>
                        )}
                     </Notifation>
                  )}
               </div>
               <div className='rounded-full overflow-hidden w-8 h-8 shadow-sm'>
                  <img
                     src={user!.avater}
                     alt={user!.name}
                     className='w-full h-full object-cover'
                  />
               </div>
               <ManuDropDown lable={user!.name}>
                  <Link to='/profile' className={itemCls}>
                     <span>
                        <FiUser />
                     </span>
                     <span>profile</span>
                  </Link>
                  <Link to='/' className={itemCls}>
                     <span>
                        <FiSettings />
                     </span>
                     <span>setting</span>
                  </Link>
                  <button className={itemCls} onClick={handleLogout}>
                     <span>
                        <FiLogOut />
                     </span>
                     <span> Logout </span>
                  </button>
               </ManuDropDown>
            </div>
         ) : (
            <nav className='flex space-x-5 font-bold'>
               <Link to='/login'>Login</Link>
               <Link to='/register'>Register</Link>
            </nav>
         )}
      </Header>
   );
};

export default NavBar;

/*
<button
                  className='flex items-center space-x-1 outline-none focus:outline-none border-none bg-transparent'
                  type='button'
                  onClick={() => toggleShow('manu')}
               >
                  <span className='font-bold capitalize'>{user!.name}</span>
                  <div className='icon-container'>
                     <FiChevronDown />
                  </div>
                  <DrowDown
                     className={`w-40 shadow-lg rounded-b-md overflow-hidden ${
                        show.manu ? 'block' : 'hidden'
                     }`}
                  >
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
                     <div
                        className='px-3 py-2 flex items-center space-x-2'
                        onClick={handleLogout}
                     >
                        <span>
                           <FiLogOut />
                        </span>
                        <span> Logout </span>
                     </div>
                  </DrowDown>
               </button>

*/
