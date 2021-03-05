import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser, acceptFriend, rejectFriend } from '../actions/user.action';
import _ from 'lodash';

type Friend = Pick<User, 'id' | 'name' | 'email' | 'username' | 'avater'>;

export type User = {
   id: string;
   name: string;
   email: string;
   username: string;
   avater: string;
   requests: { [key: string]: Friend };
   sendRequests: { [key: string]: Friend };
   friendsList: { [key: string]: Friend };
};

export interface StateI {
   readonly user: User | null;
   readonly token: string | null;
   readonly authStateLoaded: boolean;
   readonly loading: boolean;
}

export type AuthUser = Pick<StateI, 'user' | 'token'>;

const initialState: StateI = {
   user: null,
   token: null,
   authStateLoaded: false,
   loading: false,
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser(state, action: PayloadAction<Pick<StateI, 'user' | 'token'>>) {
         const { token, user } = action.payload;
         if (!user || !token) {
            return { ...state, user, token };
         } else {
            return {
               ...state,
               token,
               user: {
                  ...user,
                  requests: _.keyBy(user.requests, 'id'),
                  friendsList: _.keyBy(user.friendsList, 'id'),
                  sendRequests: _.keyBy(user.sendRequests, 'id'),
               },
            };
         }
      },
      updateUser(state, action: PayloadAction<any>) {
         return {
            ...state,
            user: {
               ...state.user,
               ...action.payload,
            },
         };
      },
      updateToken(state, action: PayloadAction<string>) {
         return {
            ...state,
            token: action.payload,
         };
      },
   },
   extraReducers: builder => {
      builder.addCase(fetchUser.pending, state => {
         return { ...state, loading: true };
      });
      builder.addCase(fetchUser.fulfilled, state => {
         return {
            ...state,
            authStateLoaded: true,
            error: false,
            loading: false,
         };
      });
      builder.addCase(fetchUser.rejected, state => {
         return {
            ...state,
            loading: false,
            authStateLoaded: true,
            user: null,
            token: null,
            error: true,
         };
      });
      // [acceptFriend.fulfilled.toString() || rejectFriend.fulfilled.toString()]: (state, action: PayloadAction<string>) => {
      //    // state.user!.requests = _.dropWhile(state.user!.requests, (req) => req.id === action.payload)
      //    // state.user!.requests = _.dropWhile(state.user!.requests, (req) => req.id === action.payload)
      //    // state.user!.requests = _.dropWhile(state.user!.requests, (req) => req.id === action.payload)
      // },
   },
});

export const { setUser, updateUser, updateToken } = userSlice.actions;

export default userSlice.reducer;
