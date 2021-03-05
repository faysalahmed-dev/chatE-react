import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/rootReducer';
import _ from 'lodash';

export const groupState = (state: RootState) => state.groups;

export const groupsSelector = createSelector(groupState, group => ({
   groups: group.groups.entities,
   loading: group.groups.loading,
}));

export const groupSelector = createSelector(groupState, group =>
   _.pick(group.group, ['loading', 'error', 'data'])
);
