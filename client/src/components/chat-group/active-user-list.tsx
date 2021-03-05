import React from 'react';
import { ActiveUser, RequestObj } from '@/ts/interface';
import { FiUserPlus } from 'react-icons/fi';
import _ from 'lodash';
import { User } from '@/app/slices/user.slice';
import { sendFriendsRequest } from '@/api/user.api';

type Props = {
   activeUser: ActiveUser;
   user: User;
   joinFriend(friendId: string, callBack?: Function): void;
   sendRequest(data: RequestObj): void;
};

const ActiveuserList: React.FC<Props> = ({
   activeUser,
   user,
   sendRequest,
   joinFriend,
}) => {
   const sendReq = React.useCallback(async () => {
      try {
         await sendFriendsRequest(activeUser.id);

         joinFriend(activeUser.id, () => {
            sendRequest({
               from: _.pick(user, ['id', 'name', 'username', 'avater']),
               to: activeUser,
            });
         });
      } catch (err) {
         console.log(err);
      }
   }, []);
   return (
      <div
         className='flex items-center py-2 px-3 secondary-bg rounded-lg'
      >
         <div className='relative w-10 h-10'>
            <div className='dot-green w-3 h-3 rounded-full absolute right-0' />
            <img
               src={activeUser.avater}
               className='w-full h-full object-cover rounded-full'
               alt='user'
            />
         </div>
         <p className='ml-2'>{activeUser.name}</p>
         {user.id !== activeUser.id && (
            <button
               className='icon-container border-0 outline-none focus:outline-none'
               onClick={sendReq}
            >
               <FiUserPlus />
            </button>
         )}
      </div>
   );
};
export default ActiveuserList;
