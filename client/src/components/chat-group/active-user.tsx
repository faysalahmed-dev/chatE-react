import React, { useContext, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiUsers } from 'react-icons/fi';
import { SocketContext } from '@/context/socket.context';
import ActiveUserListItem from './active-user-list';
import { User } from '@/app/slices/user.slice';
import { activeUsersList } from '@/app/selectors/chatGroup.selector';
import { io } from '@/context/socket.context';
import { RequestObj } from '@/ts/interface';

type Props = {
   user: User;
};

function friendJoin(userId: string, callBack?: Function) {
   io.emit('friendJoin', userId, (message: string) => {
      console.log(message);
      console.log(userId);
      if (typeof callBack === 'function') callBack();
   });
}

function sendRequest({ from, to }: RequestObj) {
   io.emit('friendRequest', { from, to }, () => {
      console.log('successfully send friend request');
   });
}

const ActiveUserComponent: React.FC<Props> = ({ user }): JSX.Element => {
   const activeUsers = useSelector(activeUsersList);
   useEffect(() => {
      friendJoin(user.id);
   }, [user]);
   return (
      <section className='dark-light-bg shadow-md rounded-lg px-3'>
         <div className='flex items-center py-6  border-b border-blue-800'>
            <div className='icon-container mr-2'>
               <FiUsers />
            </div>
            <span>Online User {activeUsers.total}</span>
         </div>
         <div className='px-2 py-3 space-y-2'>
            {Object.values(activeUsers.users).map(activeUser => (
               <ActiveUserListItem
                  key={activeUser!.id}
                  activeUser={activeUser!}
                  user={user}
                  joinFriend={friendJoin}
                  sendRequest={sendRequest}
               />
            ))}
         </div>
      </section>
   );
};

export default ActiveUserComponent;
