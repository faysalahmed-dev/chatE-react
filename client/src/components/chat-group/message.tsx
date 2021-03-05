import React from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { ChatUser } from '@/ts/interface';
import '@/sass/message.modules.scss';

type DIR = 'right' | 'left';

type Props = {
   dir: DIR;
   text: string;
   sender: ChatUser;
};

const message: React.FC<Props> = ({ dir, text, sender }): JSX.Element => {
   return (
      <div
         className={`chat-message-item mt-8 flex ${
            dir === 'right' ? 'is-right' : 'is-left'
         }`}
      >
         <div className='self-center icon-container'>
            <FiMoreVertical />
         </div>
         <p className='p-3 message-text font-bold'>{text}</p>

         <div className='relative w-12 h-12 self-end'>
            <div className='dot-green w-3 h-3 rounded-full absolute right-0' />
            <img
               src={sender.avater}
               className='rounded-full w-full h-full object-cover'
               alt=''
            />
         </div>
      </div>
   );
};
export default message;
