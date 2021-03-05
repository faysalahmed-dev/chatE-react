import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/rootReducer';
import _ from 'lodash';

export const chatGroupState = (state: RootState) => state.chatGroup;

export const messagesSelector = createSelector(
   chatGroupState,
   chatGroup => chatGroup.messages.entities
);

export const activeUsers = createSelector(
   chatGroupState,
   group => group.activeUsers.entities
);

export const activeUsersList = createSelector(chatGroupState, group => ({
   users: group.activeUsers.entities,
   total: _.keys(group.activeUsers.entities).length,
}));
