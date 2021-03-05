import React, {
   useState,
   useCallback,
   useEffect,
   useContext,
   createRef,
   RefObject,
} from 'react';
import { FiSmile, FiMic, FiPlus, FiSend } from 'react-icons/fi';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import Message from '@/components/chat-group/message';
import { User } from '@/app/slices/user.slice';
import { GroupI } from '@/app/slices/group.slice';
import '@/sass/chat-message.modules.scss';
import { messagesSelector } from '@/app/selectors/chatGroup.selector';
import { io } from '@/context/socket.context';

export type PropsChatMessage = {
   group: GroupI;
   user: User;
};
const chatMessageContainer: RefObject<HTMLDivElement> = createRef();

const sendMessage = (data: any, callBack: Function) => {
   io.emit('createMessage', data, callBack);
};

const ChatMessage: React.FC<PropsChatMessage> = ({
   group,
   user,
}): JSX.Element => {
   const [chatMaxHeight, setMaxHeight] = useState<number | 'none'>('none');
   const [message, setMessage] = useState('');

   const messages = useSelector(messagesSelector);

   const handleChange = useCallback(e => setMessage(e.target.value), []);
   useEffect(() => {
      const current = chatMessageContainer.current;
      setMaxHeight((current && current.clientHeight) || 'none');
   }, [chatMessageContainer.current]);

   return (
      <section className='flex-grow flex flex-col px-8 dark-light-bg shadow-md rounded-lg'>
         <div className='chat-header py-3 flex items-center font-bold border-b border-blue-800'>
            <div className='relative w-10 h-10 mr-3'>
               <div className='dot-green w-3 h-3 rounded-full absolute right-0' />
               <img
                  src={group.image}
                  className='rounded-full w-full h-full object-cover'
                  alt='user'
               />
            </div>
            <div>
               <h3 className='text-white'>{group.groupname}</h3>
               <p className='capitalize'>{group.location}</p>
            </div>
         </div>
         <div style={{ flexBasis: '100%' }} className='flex flex-col'>
            <div
               className='overflow-auto flex flex-col-reverse flex-1 p-4 my-4 chat-items'
               id='chat-item'
               ref={chatMessageContainer}
               style={{ maxHeight: chatMaxHeight }}
            >
               {Object.values(messages).map((mess: any, i: number) => (
                  <Message dir='left' key={i} {...mess} />
               ))}
            </div>
            <form
               className='w-full flex mb-3'
               onSubmit={e => {
                  e.preventDefault();
                  sendMessage(
                     {
                        text: message,
                        groupId: group.id,
                        sender: _.pick(user, [
                           'name',
                           'username',
                           'id',
                           'avater',
                        ]),
                     },
                     () => setMessage('')
                  );
               }}
            >
               <div className='flex flex-col relative dark-bg w-full rounded-lg'>
                  <input
                     className='pl-24 py-2 w-full bg-transparent shadow-sm input-focus'
                     name='message'
                     placeholder='Your Password...'
                     onChange={handleChange}
                     value={message}
                     autoComplete='off'
                  />
                  <div className='absolute flex space-x-2 send-message-box-icon'>
                     <div className='icon-container bg-blue-900'>
                        <FiPlus />
                     </div>
                     <div className='icon-container'>
                        <FiMic />
                     </div>
                     <div className='icon-container'>
                        <FiSmile />
                     </div>
                  </div>
               </div>
               <button
                  className='bg-blue-700 w-16 ml-2 flex justify-center items-center rounded-lg'
                  type='button'
               >
                  <FiSend />
               </button>
            </form>
         </div>
      </section>
   );
};

export default ChatMessage;
