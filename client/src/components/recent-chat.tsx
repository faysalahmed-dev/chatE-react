import React from 'react';
import styled from 'styled-components';
import Button from '@/components/button';
import InputGroup from '@/components/input-group';
import { FiPlus, FiSearch, FiChevronDown } from 'react-icons/fi';
import RecentChatItems from '@/components/recent-chat-item';

const ReacentChatItemContianer = styled.div`
   max-height: 340px;
   overflow: auto;
   & {
      scrollbar-width: thin;
      scrollbar-color: var(--dark-bg) transparent;
   }

   /* Works on Chrome/Edge/Safari */
   &::-webkit-scrollbar {
      width: 8px;
   }
   &::-webkit-scrollbar-track {
      background: transparent;
   }
   &::-webkit-scrollbar-thumb {
      background-color: var(--dark-bg);
      border-radius: 20px;
      border: 3px solid transparent;
      margin-left: 10px;
   }
`;

const RecentChat = (): JSX.Element => {
   return (
      <div className='p-3' style={{ background: 'var(--dark-light-bg)' }}>
         <Button
            className='px-3 py-2 rounded mb-4'
            style={{ background: 'var(--secondary-bg)' }}
         >
            Create Chat Group
            <FiPlus />
         </Button>
         <InputGroup
            name='some'
            placeholder='Search Here...'
            style={{ paddingLeft: '35px', background: 'var(--dark-bg)' }}
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
         <div className='flex justify-between mt-2 text-sm'>
            <div className='flex items-center'>
               <span>React Chat</span>
               <div className='icon-container'>
                  <FiChevronDown />
               </div>
            </div>
            <div className='flex items-center'>
               <span>New Chat</span>
               <div className='icon-container'>
                  <FiChevronDown />
               </div>
            </div>
         </div>
         <p className='py-3' />
         <ReacentChatItemContianer className='space-y-2 pr-2'>
           <RecentChatItems />
           <RecentChatItems />
           <RecentChatItems />
           <RecentChatItems />
           <RecentChatItems />
           <RecentChatItems />
           <RecentChatItems />
           <RecentChatItems />
           <RecentChatItems />
         </ReacentChatItemContianer>
      </div>
   );
};

export default RecentChat;
