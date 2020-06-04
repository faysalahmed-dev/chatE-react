import { useCallback, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import useQuery from '@/hooks/useQueryHook';
import useToggle from '@/hooks/useToggleHook';

import { UserContext } from '@/context/user/user.context'
import { loginUser } from '@/context/user/user.actions';
import { ToastContext } from '@/context/toastMessage.context';

export default () => {
	const { setUser, isAuthenticated } = useContext(UserContext);
   const { setToastMessage } = useContext(ToastContext);
   const [formSubmiting, setFormSubmiting] = useToggle(false);
   const { replace } = useHistory()
   const redirectTo = useQuery().get('redirect')
   const onSubmit = useCallback((path: string) => async (formData:any) => {
       setFormSubmiting(true)
        try {
            const userData = await loginUser({path, formData})
            setUser(userData)
            setToastMessage({ status: true, message:"Successfully Loggedin", type:"success" })
            replace(redirectTo || '/dashboard')
        } catch (err) {
        	setFormSubmiting(false)
          setToastMessage({ status: true, message: err, type:"error" })
        }
    }, [])
   return { isAuthenticated , formSubmiting, onSubmit}
}