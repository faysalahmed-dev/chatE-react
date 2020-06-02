import React from 'react';
import styled from 'styled-components';

// import RealMadriad from '@/assets/club-image/real-madriad.png';
// import AtleticoMadriad from '@/assets/club-image/atletico-madriad.png';
// import Barcelona from '@/assets/club-image/barcelona.png';
// import BayernMunchen from '@/assets/club-image/bayern-munchen.png';
// import Chelsea from '@/assets/club-image/chelsea.png';
// import PSG from '@/assets/club-image/psg.png';
// import ManchesterCity from '@/assets/club-image/manchester-city.png';
// import ManchesterUnited from '@/assets/club-image/manchester-united.png';


import ChatClubItem from '@/components/chat-club-item';

const ChatClubItemContianer = styled.div`
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(200px, 250px));
   grid-gap: 20px;
   justify-content: center;
`;

export default (): JSX.Element => {
   return (
      <ChatClubItemContianer className='p-5'>
         <ChatClubItem />
         <ChatClubItem />
         <ChatClubItem />
         <ChatClubItem />
         <ChatClubItem />
         <ChatClubItem />
         <ChatClubItem />
      </ChatClubItemContianer>
   );
};
