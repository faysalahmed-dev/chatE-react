import isJWT from 'validator/lib/isJWT';
import ls from '@/utils/localStorage';
import axios from '@/api/api';
import { SET_USER_PROP } from '@/reducers/user.reducer'

export const getAuthUser = async (): Promise<SET_USER_PROP> => {
	const token = ls.getToken()
    if(token && isJWT(token)) {
    	try {
	      	const res = await axios.get('user/auth-user')
            if(res.data.status === 'success') {
            	return { user: res.data.data, token };
            } else {
               throw res.data;
            }
    	} catch (err) {
    		throw new Error('unauth')
    	}
    } else {
        return { user: null, token: null };
    }
}
type LoginUser<T> = {
    path: string;
    formData: T 
}
export const loginUser = async <T>({path, formData}: LoginUser<T>) => {
    try {
        const { data } = await axios.post(path, formData)
            if(data.status === 'success') {
                ls.setToken(data.token)
                return {user: data.data, token: data.token};
            } else {
              throw data;
            }
        } catch (err) {
            console.log(err.message)
            console.log(err.response)
            if(err.response) {
                return Promise.reject(err.response.data.error.message)
            } else if(err.message === 'Network Error') {
                return Promise.reject('Please Check Your Network Connection')
            } else {
                return Promise.reject('Some thing went wrong..')
            }
        }
}

export const logoutUser = () => {
    ls.removeToken();
}