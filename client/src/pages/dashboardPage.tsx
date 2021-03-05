import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchGroups } from '@/app/actions/group.action';

import RecentChat from '@/components/dashboard/recent-chats';
import ChatGroups from '@/components/dashboard/chat-groups';

import '@/sass/dashboard.modules.scss';
import { groupsSelector } from '@/app/selectors/group.selector';
import { FiSearch } from 'react-icons/fi';
import ManuDropDown from '@/components/sheard/manu-drop-down';

import styled from 'styled-components';

const SearchInputIconContainer = styled.div`
   top: 50%;
   transform: translatey(-50%);
   left: 10px;
`;
const itemCls = 'px-3 py-2 block';
const DashboardPage = (): JSX.Element => {
   const { loading, groups } = useSelector(groupsSelector);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchGroups());
   }, []);
   return (
      <section
         className='w-full'
         style={{ paddingTop: 'var(--sections-top-padding)' }}
      >
         <div className='mx-auto chat-container h-full'>
            <div
               className='rounded-lg overflow-hidden chat-aside fixed bottom-0 h-full'
               style={{
                  height: `calc(100% - calc(var(--header-height) + var(--sections-top-padding)))`,
               }}
            >
               <RecentChat />
            </div>
            <div className='rounded-lg overflow-hidden flex-grow chat-club-section h-full'>
               <div className='flex justify-end items-center p-3 space-x-3 border-b border-blue-800 dark-light-bg'>
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
                  <ManuDropDown lable='Public' dropDownType='secondry'>
                     <button className={itemCls}>Public</button>
                     <button className={itemCls}>Joined</button>
                     <button className={itemCls}>Farvriot</button>
                  </ManuDropDown>
               </div>
               <ChatGroups loading={loading} groups={groups} />
            </div>
         </div>
      </section>
   );
};

export default DashboardPage;

/*


 // <div className='relative'>
                  //       <button className='px-3 py-2'>Public</button>
                  //    <DrowDown className='w-40 shadow-lg rounded-b-md overflow-hidden'>
                  //       <button className='px-3 py-2'>Public</button>
                  //       <button className='px-3 py-2'>Joined</button>
                  //       <button className='px-3 py-2'>Favriote</button>
                  //    </DrowDown>
                  // </div>

                  */
