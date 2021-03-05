import { Message, UserI } from '@/ts/interface';
import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter<Message>({
   selectId: message => message.id
})
const activeUserAdapter = createEntityAdapter<UserI>({
   selectId: user => user.id
})

const initialState = {
   messages: messagesAdapter.getInitialState(),
   activeUsers: activeUserAdapter.getInitialState(),
}

const messages = createSlice({
   name: 'message',
   initialState,
   reducers: {
      addMessage(state, action: PayloadAction<Message>){
         messagesAdapter.addOne(state.messages, action.payload)
      },
      setActiveUserList(state, action: PayloadAction<UserI[]>) {
         activeUserAdapter.setAll(state.activeUsers, action.payload)
      }
   },
   extraReducers: {},
});

export const {
   addMessage,
   setActiveUserList,
} = messages.actions;

export default messages.reducer;
