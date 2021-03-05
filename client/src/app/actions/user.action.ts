import { getAuthUser, acceptFriendsRequest, cancleFriendsRequest } from '@/api/user.api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setNotification, removeNotification } from '@/app/slices/notifications.slice';
import {setUser} from '@/app/slices/user.slice'

export const fetchUser = createAsyncThunk(
   'user/fetchUser',
   async (_, { dispatch }) => {
   		const user = await getAuthUser()
   		if(user.user && user.token) {
   			dispatch(setNotification(user.user.requests))
   		}
         dispatch(setUser(user))
   		return user;
   }
);

export const acceptFriend = createAsyncThunk('user/acceptFriend', async(userId: string, {dispatch, rejectWithValue}) => {
	try {
		await acceptFriendsRequest(userId);
		dispatch(removeNotification(userId));
		return true;
	} catch (err) {
		return rejectWithValue(err);
	}
}) 

export const rejectFriend = createAsyncThunk('user/rejectFriend', async(userId: string, {dispatch, rejectWithValue}) => {
   try {
      await cancleFriendsRequest(userId);
      dispatch(removeNotification(userId));
      return true;
   } catch (err) {
      return rejectWithValue(err);
   }
}) 
