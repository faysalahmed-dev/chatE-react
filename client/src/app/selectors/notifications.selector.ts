import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/rootReducer';
import _ from 'lodash';

export const notificationsState = (state: RootState) => state.notifications;

export const notificationsSelector = createSelector(notificationsState, notification => ({
	notifications: notification!.entities,
	count: notification.newNotificationsCount
}))