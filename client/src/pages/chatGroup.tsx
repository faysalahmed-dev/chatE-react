import React, { useEffect, useContext } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ActiveUserList, Message } from '@/ts/interface';

import { SocketContext } from '@/context/socket.context';

import UserProfile from '@/components/chat-group/user-profile';
import ChatMessage from '@/components/chat-group/chat-message';
import ActiveUser from '@/components/chat-group/active-user';
import ErrorComponent from '@/components/errorComponent';

import { fetchGroup } from '@/app/actions/group.action';

import { groupSelector } from '@/app/selectors/group.selector';
import { userDataSelector } from '@/app/selectors/user.selector';

import { GroupI } from '@/app/slices/group.slice';
import { User } from '@/app/slices/user.slice';
import { addNotification } from '@/app/slices/notifications.slice';
import { setActiveUserList, addMessage } from '@/app/slices/chatGroup.slice';

import { NewFriendRequest, UserI } from '@/ts/interface';

const ChatContainer = styled.section`
   display: grid;
   grid-template-columns: 20% 1fr 20%;
   grid-gap: 0 20px;
   width: 95%;
`;

export default (): JSX.Element => {
   const io = useContext(SocketContext);
   const dispatch = useDispatch();
   const { error, data: group, loading } = useSelector(groupSelector);
   const user = useSelector(userDataSelector);
   const { groupName } = useParams<{ groupName: string }>();

   useEffect(() => {
      dispatch(fetchGroup(groupName));
   }, []);

   useEffect(() => {
      if (group && user) {
         const data = {
            ..._.pick(user, ['id', 'name', 'username', 'avater']),
            groupId: group.id,
         };
         io.emit('join', data, () =>
            console.log('successfully join the group')
         );
         return () => {
            io.emit('leave', group.id);
         };
      }
   }, [groupName, group]);

   useEffect(() => {
      io.on('activeUserList', (list: UserI[]) => {
         dispatch(setActiveUserList(list));
      });
      io.on('newMessage', (data: Message) => {
         dispatch(addMessage(data));
      });
      io.on('newFriendRequest', (userData: NewFriendRequest) => {
         dispatch(addNotification(userData.sender));
      });
   }, []);

   if (error)
      return (
         <ErrorComponent
            message='Group Not Found'
            statusCode={404}
            navigateText='Back To Dashboard'
            navigateTo='/dashboard'
         />
      );

   if (loading || !group)
      return (
         <div className='w-full h-full flex items-center justify-center'>
            <div className='dot-spin'></div>
         </div>
      );
   return (
      <ChatContainer className='pt-10 mx-auto pb-8'>
         <UserProfile />
         <ChatMessage group={group as GroupI} user={user as User} />
         <ActiveUser user={user as User} />
      </ChatContainer>
   );
};
