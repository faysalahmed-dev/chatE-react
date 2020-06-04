import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
   .loader {
      border: 2px solid var(--app-font-color);
      border-bottom: transparent;
      animation: loader 0.3s forwards infinite ease-in-out;
      @keyframes loader {
         100% {
            transform: rotate(360deg);
         }
      }
   }
`;

interface PropsI {
   children: React.ReactNode;
   handleClick?: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
   loading?: boolean;
   className?: string;
   [key: string]: any;
}

export default ({
   children,
   handleClick,
   loading,
   className,
   ...others
}: PropsI) => (
   <Button
      {...others}
      onClick={handleClick}
      className={`inline-flex items-center justify-center ${
         (loading || others.disabled) && 'opacity-75 pointer-events-none'
      } ${className}`}
      disabled={loading}
   >
      {loading ? <div className='loader w-5 h-5 rounded-full' /> : children}
   </Button>
);
