import React from 'react';
import styled from 'styled-components';
import UserProfile from '@/components/chat-club/user-profile';
import ChatMessage from '@/components/chat-club/chat-message';
import ActiveUser from '@/components/chat-club/active-user';

const ChatContainer = styled.section`
	display: grid;
	grid-template-columns: 20% 1fr 20%;
	grid-gap:0 20px;
	width: 95%;
`

export default (): JSX.Element => {
   return (
      <ChatContainer className='pt-10 mx-auto pb-8'>
         <UserProfile />
         <ChatMessage />
         <ActiveUser />
      </ChatContainer>
   );
};
