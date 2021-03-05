import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';
import { ChatUser } from '@/ts/interface'

const notificationsAdapter = createEntityAdapter<ChatUser>({
   selectId: user => user.id
})

const notifications = createSlice({
   name: 'notifications',
   initialState: notificationsAdapter.getInitialState({
      newNotificationsCount: 0,
      loading: false,
      error: false,
      loaded: false
   }),
   reducers: {
   		addNotification(state, action: PayloadAction<ChatUser>) {
            notificationsAdapter.addOne(state, action.payload)
   			state.newNotificationsCount = state.newNotificationsCount + 1; 
   		},
         setNotification(state, action: PayloadAction<{[key: string]: ChatUser}>){
            notificationsAdapter.setAll(state, action.payload);
            state.newNotificationsCount = Object.keys(action.payload).length; 
         },
   		removeNotification(state, action:PayloadAction<string>) {
            notificationsAdapter.removeOne(state, action.payload);
            if(state.newNotificationsCount)
            state.newNotificationsCount = state.newNotificationsCount - 1 
         },
   		resetNotificationCount(state) {
   			state.newNotificationsCount = 0;
   		}
   },
   extraReducers: {

   },
});

export const { addNotification, resetNotificationCount, removeNotification, setNotification } = notifications.actions;

export default notifications.reducer;
