import React from 'react';
import styled from 'styled-components';

const InputGroup = styled.div``;
const Input = styled.input`
   outline: none;
   width: 100%;
`;
const Label = styled.label``;

interface InputGroup {
   label?: string;
   type?: string;
   name: string;
   error?: { type?:string, message?: string };
   [key: string]: any;
   inputGroupStyle?: React.CSSProperties;
   inputGroupClass?: string;
   className?: string;
   handleChange?(e: React.ChangeEvent<HTMLInputElement>): void;
   handleBlur?(e: React.FocusEvent<HTMLInputElement>): void;
}

export default ({
   label,
   inputGroupStyle,
   inputGroupClass,
   className,
   error,
   type,
   children,
   ...others
}: InputGroup): JSX.Element => {
   return (
      <InputGroup
         style={inputGroupStyle}
         className={`flex flex-col relative ${inputGroupClass}`}
      >
         {label && (
            <Label htmlFor={others.name} className='mb-2'>
               {label}
            </Label>
         )}
         <Input
            id={others.name}
            {...others}
            className={'px-3 py-2 rounded bg-transparent ' + className}
            type={type || 'text'}
            
         />
         {error && (
            <p className='py-1 text-orange-400 capitalize'>{error.message}</p>
         )}
         {children}
      </InputGroup>
   );
};
