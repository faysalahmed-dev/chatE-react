import React, { useCallback, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '@/app/slices/user.slice';
import { FaPencilAlt } from 'react-icons/fa';
import Button from '@/components/button';
import { updateAvater } from '@/api/user.api';
import { ToastContext } from '@/context/toastMessage.context';

export default ({ image }: { image: string }) => {
   const dispatch = useDispatch();
   const [loading, setLoading] = useState(false);
   const [imageUrl, setImageUrl] = useState(image);
   const [isEditMode, setEditMode] = useState(false);
   const [file, setFile] = useState<File | null>(null);
   const { setToastMessage } = useContext(ToastContext);

   const onFileInput = (e: any) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0]) {
         setFile(target.files[0]);
         var reader = new FileReader();
         reader.onload = function (uploadedFile) {
            if (typeof uploadedFile.target?.result === 'string') {
               setImageUrl(uploadedFile.target?.result);
               setEditMode(true);
            }
         };
         reader.readAsDataURL(target.files[0]);
      } else {
         setToastMessage({
            status: true,
            message: "Image Can't loaded",
            type: 'error',
         });
         setEditMode(false);
      }
   };

   const handleSubmit = async () => {
      if (file) {
         setLoading(true);
         try {
            const avaterInfo = await updateAvater(file);
            setLoading(false);
            setToastMessage({
               status: true,
               message: 'Profile Image Updated',
               type: 'success',
            });
            dispatch(updateUser(avaterInfo));
            setEditMode(false);
         } catch (err) {
            setLoading(false);
            setToastMessage({
               status: true,
               message: 'Profile Image could not updated',
               type: 'error',
            });
         }
      }
   };

   const handleCancle = useCallback(() => {
      setImageUrl(image);
      setEditMode(false);
   }, [image]);
   return (
      <div className='w-full mb-6'>
         <div className='h-40 w-40 mx-auto relative border-4 border-purple-700 rounded-full'>
            <img
               src={imageUrl}
               alt='user-image'
               className='w-full h-full block object-cover rounded-full'
            />
            <label
               htmlFor='profile'
               className='w-12 h-12 flex justify-center items-center rounded-full bg-green-500 cursor-pointer bottom-0 right-0 absolute text-white'
            >
               <FaPencilAlt className='w-5 h-5' />
               <input
                  type='file'
                  name='avater'
                  id='profile'
                  className='hidden'
                  accept='image/x-png,image/jpeg'
                  onChange={onFileInput}
               />
            </label>
         </div>
         {isEditMode && (
            <div className='text-center mt-4 flex items-center justify-center'>
               <Button
                  className='w-24 h-10 rounded bg-green-500 shadow-md mt-2 input-focus'
                  loading={loading}
                  type='button'
                  handleClick={handleSubmit}
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
         )}
      </div>
   );
};
