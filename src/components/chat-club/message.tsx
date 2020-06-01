import React from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import user1 from '../../assets/user-image/user-1.jpg';
import '@/sass/message.modules.scss';

type DIR = 'right' | 'left'

export default ({ dir }: {dir: DIR}):JSX.Element => {
	return (
       <div className={`chat-message-item mt-8 flex ${dir === 'right' ? 'is-right': 'is-left'}`}>
          <div className='self-center icon-container'>
             <FiMoreVertical/>
          </div>
          <p className='p-3 message-text font-bold'>
             Lorem, ipsum dolor sit amet consectetur adipisicing elit.
             Esse quae obcaecati ab
          </p>

          <div className='relative w-12 h-12 self-end'>
             <div className='dot-green w-3 h-3 rounded-full absolute right-0' />
             <img
                src={user1}
                className='rounded-full w-full h-full object-cover'
                alt=''
             />
          </div>
       </div>  
	)
}