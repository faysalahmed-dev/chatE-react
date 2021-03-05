import isJWT from 'validator/lib/isJWT';
import ls from '@/utils/localStorage';
import axios from '@/api/api';
import { AuthUser, User } from '@/app/slices/user.slice';

export const getAuthUser = async (): Promise<AuthUser> => {
   const token = ls.getToken();
   if (token && isJWT(token)) {
      try {
         const res = await axios.get('user/auth-user');
         return { user: res.data.data, token };
      } catch (err) {
         return { user: null, token: null };
      }
   } else {
      return { user: null, token: null };
   }
};
type LoginUser<T> = {
   path: string;
   formData: T;
};
export const loginUser = async <T>({ path, formData }: LoginUser<T>) => {
   try {
      const { data } = await axios.post(path, formData);
      ls.setToken(data.token);
      return { user: data.data, token: data.token };
   } catch (err) {
      return Promise.reject(err);
   }
};

export const logoutUser = () => {
   ls.removeToken();
};

export const sendFriendsRequest = async (userId: string) => {
   try {
      await axios.patch('/user/send-request/' + userId);
      return true;
   } catch (err) {
      return Promise.reject(err);
   }
};

export const acceptFriendsRequest = async (userId: string) => {
   try {
      await axios.patch('/user/accept-request/' + userId);
      return true;
   } catch (err) {
      return Promise.reject(err);
   }
};

export const cancleFriendsRequest = async (userId: string) => {
   try {
      await axios.delete('/user/cancle-request/' + userId);
      return true;
   } catch (err) {
      return Promise.reject(err);
   }
};

export const updateAvater = async (file: File) => {
   try {
      const formData = new FormData();
      formData.append('avater', file);
      const fileinfo = await axios.patch('user/update-avater', formData, {
         headers: {
            'Content-Type': 'multipart/form-data',
         },
      });
      return fileinfo.data.data as { avater: string };
   } catch (err) {
      return Promise.reject(err);
   }
};

type UserInfoKeyI = Pick<User, 'email' | 'name' | 'username'>;
interface UserUpdateI extends UserInfoKeyI {
   password: string;
}
export const updateInfo = async (data: UserUpdateI) => {
   try {
      const fileinfo = await axios.patch('user/update-info', data);
      return fileinfo.data.data as User;
   } catch (err) {
      console.log(err);
      return Promise.reject(err);
   }
};

export const updatePassword = async (data: {
   password: string;
   newPassword: string;
}) => {
   try {
      const res = await axios.patch('user/update-password', data);
      ls.setToken(res.data.token);
      return res.data;
   } catch (err) {
      console.log(err);
      return Promise.reject(err);
   }
};
