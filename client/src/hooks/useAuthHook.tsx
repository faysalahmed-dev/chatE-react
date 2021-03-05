import { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import useQuery from '@/hooks/useQueryHook';
import useToggle from '@/hooks/useToggleHook';

import { ToastContext } from '@/context/toastMessage.context';
import { loginUser } from '@/api/user.api';
import { isAuthenticatedSelector } from '@/app/selectors/user.selector';
import { setUser } from '@/app/slices/user.slice';

export default () => {
   const isAuthenticated = useSelector(isAuthenticatedSelector);
   const dispatch = useDispatch();
   const { setToastMessage } = useContext(ToastContext);
   const [formSubmiting, setFormSubmiting] = useToggle(false);
   const { replace } = useHistory();
   const redirectTo = useQuery().get('redirect');
   const onSubmit = useCallback(
      (path: string) => async (formData: any) => {
         setFormSubmiting(true);
         try {
            const userData = await loginUser({ path, formData });
            dispatch(setUser(userData));
            setToastMessage({
               status: true,
               message: 'Successfully Loggedin',
               type: 'success',
            });
            replace(redirectTo || '/dashboard');
         } catch (err) {
            setFormSubmiting(false);
            setToastMessage({ status: true, message: err, type: 'error' });
         }
      },
      []
   );
   return { isAuthenticated, formSubmiting, onSubmit };
};
