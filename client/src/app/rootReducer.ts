import { combineReducers, Reducer, Action, Store } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import groupReducer from './slices/group.slice';
import chatGroupReducer from './slices/chatGroup.slice';
import notificationsReducer from './slices/notifications.slice';
import { logoutUser } from '@/api/user.api';

const appReducer = combineReducers({
   user: userReducer,
   notifications: notificationsReducer,
   chatGroup: chatGroupReducer,
   groups: groupReducer,
});

const rootReducer = (state: any, action: Action<string>) => {
   if (action.type === 'LOGOUT_USER') {
      // @ts-ignore
      state = undefined;
      logoutUser();
   }
   return appReducer(state, action);
};

export type RootState = ReturnType<typeof appReducer>;

export default rootReducer;
