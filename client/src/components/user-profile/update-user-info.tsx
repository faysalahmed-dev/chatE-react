import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import { updateUser, User } from '@/app/slices/user.slice';
import { ToastContext } from '@/context/toastMessage.context';

import Button from '@/components/button';
import { updateInfo } from '@/api/user.api';
import { useDispatch } from 'react-redux';
import PasswordInputEye from '../utils/password-input-eye';

export default ({ user }: { user: User }) => {
   const init = {
      name: user.name,
      username: user.username,
      email: user.email,
      password: '',
   };
   const [isEditMode, setEditMode] = useState(false);
   const [loading, setLoading] = useState(false);
   const [showPass, setShowPass] = useState(false);
   const [clsName, setClsName] = useState(
      'flex flex-col mb-8 opacity-75 select-none'
   );
   const { setToastMessage } = useContext(ToastContext);
   const dispatch = useDispatch();
   const { errors, register, handleSubmit, reset } = useForm({
      defaultValues: init,
      mode: 'onChange',
   });
   const handleCancle = useCallback(() => {
      reset();
      setEditMode(false);
   }, [reset, setEditMode]);
   const onClick = useCallback(async (data: typeof init) => {
      try {
         setLoading(true);
         const userUpdateData = await updateInfo(data);
         setLoading(false);
         setToastMessage({
            status: true,
            message: 'Profile Updated',
            type: 'success',
         });
         dispatch(updateUser(userUpdateData));
         setEditMode(false);
      } catch (err) {
         setLoading(false);
         setToastMessage({
            status: true,
            message: err,
            type: 'error',
         });
      }
   }, []);
   useEffect(() => {
      if (isEditMode) {
         setClsName('flex flex-col mb-8');
      } else {
         setClsName('flex flex-col mb-8 opacity-75 select-none');
      }
   }, [isEditMode]);

   return (
      <form className='w-1/2 p-8'>
         <div className={clsName}>
            <label className='mb-2'>Name</label>
            <input
               className='p-3 rounded dark-light-bg shadow-sm input-focus'
               name='name'
               placeholder='Your Name...'
               autoFocus
               disabled={!isEditMode}
               ref={register({
                  required: 'Name is required',
                  minLength: { value: 3, message: 'Name Too Short' },
                  validate: value =>
                     /^[a-z\s]*$/gi.test(value) || 'Name Only Contains Letters',
               })}
            />
            {errors.name && (
               <p className='py-1 text-orange-400 capitalize'>
                  {errors.name.message}
               </p>
            )}
         </div>
         <div className={clsName}>
            <label className='mb-2'>User Name</label>
            <input
               className='p-3 rounded dark-light-bg shadow-sm input-focus'
               name='username'
               placeholder='Your User Name...'
               disabled={!isEditMode}
               ref={register({
                  required: 'User Name is required',
                  minLength: { value: 4, message: 'username too short' },
                  validate: value =>
                     /^[a-z\d]*$/gi.test(value) ||
                     'User Name Only Contains Letters and Numbers',
               })}
            />
            {errors.username && (
               <p className='py-1 text-orange-400 capitalize'>
                  {errors.username.message}
               </p>
            )}
         </div>
         <div className={clsName}>
            <label className='mb-2'>Email</label>
            <input
               className='p-3 rounded dark-light-bg shadow-sm input-focus'
               name='email'
               placeholder='Your Email...'
               disabled={!isEditMode}
               ref={register({
                  required: 'Email is required',
                  validate: value => isEmail(value) || 'invalid email address',
               })}
            />
            {errors.email && (
               <p className='py-1 text-orange-400 capitalize'>
                  {errors.email.message}
               </p>
            )}
         </div>
         {isEditMode && (
            <div className={clsName}>
               <label className='mb-2'>Password</label>
               <div className='relative'>
                  <input
                     className='p-3 w-full rounded dark-light-bg shadow-sm input-focus'
                     name='password'
                     placeholder='.......'
                     type={showPass ? 'text' : 'password'}
                     ref={register({
                        required: 'Password is required',
                        minLength: {
                           value: 6,
                           message: 'Password Too Short. Min 6',
                        },
                     })}
                  />
                  <PasswordInputEye
                     showPass={showPass}
                     onClick={() => setShowPass(prev => !prev)}
                  />
               </div>
               {errors.password && (
                  <p className='py-1 text-orange-400 capitalize'>
                     {errors.password.message}
                  </p>
               )}
            </div>
         )}
         {isEditMode ? (
            <div className='flex items-center'>
               <Button
                  className='w-24 h-10 rounded bg-green-500 shadow-md mt-2 input-focus'
                  loading={loading}
                  handleClick={handleSubmit(onClick)}
                  type='button'
               >
                  Save
               </Button>
               <Button
                  className='w-24 h-10 rounded bg-red-500 shadow-md mt-2 ml-3 input-focus'
                  disabled={loading}
                  handleClick={handleCancle}
                  type='button'
               >
                  Cancle
               </Button>
            </div>
         ) : (
            <Button
               className='w-24 h-10 rounded bg-green-500 shadow-md mt-2 input-focus'
               handleClick={() => setEditMode(true)}
               type='button'
            >
               Edit
            </Button>
         )}
      </form>
   );
};
