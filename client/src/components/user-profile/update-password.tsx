import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '@/components/button';
import { updatePassword } from '@/api/user.api';
import { useDispatch } from 'react-redux';
import { ToastContext } from '@/context/toastMessage.context';
import { updateToken } from '@/app/slices/user.slice';
import PasswordInputEye from '../utils/password-input-eye';

const init = { currentPassword: '', newPassword: '', confirmPassword: '' };

const passValidate = (field: string) => ({
   required: field + ' Is Required',
   minLength: {
      value: 6,
      message: field + ' Too Short. Min 6',
   },
});
const initShowPass = {
   currentPassword: false,
   newPassword: false,
   confirmPassword: false,
};
export default () => {
   const [loading, setLoading] = useState(false);
   const [isEditMode, setEditMode] = useState(false);
   const [showPass, setShowPass] = useState(initShowPass);
   const [clsName, setClsName] = useState(
      'flex flex-col mb-8 opacity-75 select-none'
   );

   const { setToastMessage } = useContext(ToastContext);
   const dispatch = useDispatch();
   const { errors, register, handleSubmit, reset, watch } = useForm({
      defaultValues: init,
      mode: 'onChange',
   });

   const toggleShowPass = useCallback(
      (key: string) => {
         return () => {
            //@ts-ignore
            setShowPass(prev => ({ ...prev, [key]: !prev[key] }));
         };
      },
      [setShowPass]
   );
   const onClick = useCallback(async (data: typeof init) => {
      try {
         setLoading(true);
         const userUpdateData = await updatePassword({
            newPassword: data.newPassword,
            password: data.currentPassword,
         });
         setLoading(false);
         setToastMessage({
            status: true,
            message: 'Password Updated',
            type: 'success',
         });
         dispatch(updateToken(userUpdateData.token));
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
         reset();
         setShowPass(initShowPass);
         setLoading(false);
         setClsName('flex flex-col mb-8 opacity-75 select-none');
      }
   }, [isEditMode]);

   return (
      <form className='w-1/2 p-8'>
         <div className={clsName}>
            <label className='mb-2'>Current Password</label>
            <div className='relative'>
               <input
                  className='p-3 rounded dark-light-bg shadow-sm input-focus w-full'
                  name='currentPassword'
                  placeholder='........'
                  type={showPass.currentPassword ? 'text' : 'password'}
                  autoFocus
                  disabled={!isEditMode}
                  ref={register(passValidate('Current Password'))}
               />
               <PasswordInputEye
                  showPass={showPass.currentPassword}
                  onClick={toggleShowPass('currentPassword')}
               />
            </div>
            {errors.currentPassword && (
               <p className='py-1 text-orange-400 capitalize'>
                  {errors.currentPassword.message}
               </p>
            )}
         </div>
         <div className={clsName}>
            <label className='mb-2'>New Password</label>
            <div className='relative'>
               <input
                  className='p-3 rounded dark-light-bg shadow-sm input-focus w-full'
                  name='newPassword'
                  type={showPass.newPassword ? 'text' : 'password'}
                  placeholder='........'
                  disabled={!isEditMode}
                  ref={register(passValidate('New Password'))}
               />
               <PasswordInputEye
                  showPass={showPass.newPassword}
                  onClick={toggleShowPass('newPassword')}
               />
            </div>
            {errors.newPassword && (
               <p className='py-1 text-orange-400 capitalize'>
                  {errors.newPassword.message}
               </p>
            )}
         </div>
         <div className={clsName}>
            <label className='mb-2'>Confirm Password</label>
            <div className='relative'>
               <input
                  className='p-3 rounded dark-light-bg shadow-sm input-focus w-full'
                  name='confirmPassword'
                  type={showPass.confirmPassword ? 'text' : 'password'}
                  placeholder='........'
                  disabled={!isEditMode}
                  ref={register({
                     ...passValidate('Confirm Password'),
                     validate: value =>
                        value === watch('newPassword', '') ||
                        'The passwords do not match',
                  })}
               />
               <PasswordInputEye
                  showPass={showPass.confirmPassword}
                  onClick={toggleShowPass('confirmPassword')}
               />
            </div>
            {errors.confirmPassword && (
               <p className='py-1 text-orange-400 capitalize'>
                  {errors.confirmPassword.message}
               </p>
            )}
         </div>
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
                  handleClick={() => setEditMode(false)}
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
