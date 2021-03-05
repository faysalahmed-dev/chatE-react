import React from 'react';
import UpdatePassword from '@/components/user-profile/update-password';
import UpdateUserInfo from '@/components/user-profile/update-user-info';
import UpdateUserAvater from '@/components/user-profile/update-avater';
import { useDispatch, useSelector } from 'react-redux';
import { userDataSelector } from '@/app/selectors/user.selector';
import { Redirect } from 'react-router-dom';

export default () => {
   const user = useSelector(userDataSelector);
   if (!user) return <Redirect to='/' />;
   return (
      <section>
         <div className='container mx-auto flex flex-wrap py-10 px-8'>
            <UpdateUserAvater image={user.avater} />
            <UpdateUserInfo user={user} />
            <UpdatePassword />
         </div>
      </section>
   );
};
