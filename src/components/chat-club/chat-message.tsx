import React from 'react';
import { FiSmile, FiMic, FiPlus, FiSend } from 'react-icons/fi'

import InputGroup from '@/components/input-group';
import Message from '@/components/chat-club/message';

import realMadriad from '../../assets/club-image/real-madriad.png';

import '@/sass/chat-message.modules.scss'


export default (): JSX.Element => {
   return (
      <section className='flex-grow flex flex-col px-8 dark-light-bg shadow-md rounded-lg'>
         <div className='chat-header py-3 flex items-center font-bold border-b border-blue-800'>
            <div className='relative w-10 h-10 mr-3'>
               <div className='dot-green w-3 h-3 rounded-full absolute right-0' />
               <img
                  src={realMadriad}
                  className='rounded-full w-full h-full object-cover'
                  alt='user'
               />
            </div>
            <div>
               <h3 className='text-white'>Real Madriad</h3>
               <p>Spain</p>
            </div>
         </div>
         <div>
            <div
               className='overflow-auto flex flex-col-reverse p-4 my-4 chat-items'
               id='chat-item'
               style={{maxHeight: '320px'}}
            >
               <Message dir="left"/>
               <Message dir="right" />
               <Message dir="left"/>
               <Message dir="right"/>
               <Message dir="left"/>
               <Message dir="right"/>
            </div>
            <div className='w-full flex'>
               <InputGroup
                  name='message'
                  className='pl-24'
                  inputGroupClass='w-full dark-bg rounded-lg'
                  placeholder='Write Message Here...'
               >
                  <div className="absolute flex space-x-2 send-message-box-icon">
                     <div className="icon-container bg-blue-900"><FiPlus /></div>
                     <div className="icon-container"><FiMic /></div>
                     <div className="icon-container"><FiSmile /></div>
                  </div>              
               </InputGroup>
               <button
                  className='bg-blue-700 w-16 ml-2 flex justify-center items-center rounded-lg'
                  type='button'
               >
                  <FiSend />
               </button>
            </div>
         </div>
      </section>
   );
};
