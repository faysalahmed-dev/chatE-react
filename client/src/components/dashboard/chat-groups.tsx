import React from 'react';
import styled from 'styled-components';
import ChatGroupsItem from '@/components/dashboard/chat-groups-item';
import withLoader from '@/HOC/withLoader';
import { GroupI } from '@/app/slices/group.slice';

const ChatClubItemContianer = styled.div`
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
   grid-gap: 20px;
   justify-content: center;
`;

interface Props {
   groups: GroupI[];
   loading: boolean;
}

const chatGroup: React.FC<Props> = ({ groups }): JSX.Element => {
   return (
      <ChatClubItemContianer className='p-5'>
         {groups.length < 1 ? (
            <p className='text-center text-xl pt-5'>Groups Not Found</p>
         ) : (
            Object.values(groups).map(group => <ChatGroupsItem {...group} key={group.id} />)
         )}
      </ChatClubItemContianer>
   );
};
export default withLoader(chatGroup);
