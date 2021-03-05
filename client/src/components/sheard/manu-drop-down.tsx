import React from 'react';
import useToggle from '@/hooks/useToggleHook';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import _ from 'lodash';

const DrowDown = styled.div`
   position: absolute;
   top: 46px;
   right: -3px;
   a,
   div,
   button {
      transition: all 0.3s;
      &:hover {
         background: #4a5479;
      }
   }
`;

type PropsDropDown = {
   lable: string;
   dropDownType?: 'main' | 'secondry';
};
const ManuDropDown: React.FC<PropsDropDown> = ({
   children,
   dropDownType,
   ...rest
}) => {
   const [show, setShow] = useToggle(false);
   return (
      <div className='relative'>
         <button
            className='flex items-center space-x-1 outline-none focus:outline-none border-none bg-transparent'
            type='button'
            onClick={setShow}
         >
            <span className='font-bold capitalize'>{rest.lable}</span>
            <div className='icon-container'>
               {show ? <FiChevronUp /> : <FiChevronDown />}
            </div>
         </button>
         {show && (
            <DrowDown
               className='capitalize w-40 shadow-lg rounded-b-md overflow-hidden flex-col flex z-30'
               style={{
                  background:
                     dropDownType === 'secondry'
                        ? 'var(--dark-bg)'
                        : 'var(--dark-light-bg)',
               }}
            >
               {children}
            </DrowDown>
         )}
      </div>
   );
};
export default ManuDropDown;
