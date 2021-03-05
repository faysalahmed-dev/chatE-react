import { createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit';

import { fetchGroups, fetchGroup } from '../actions/group.action';

export interface GroupI {
   readonly id: string;
   readonly groupname: string;
   readonly location: string;
   readonly image: string;
   readonly slug: string;
   readonly groupType: 'private' | 'public';
}

const groupsAdapter = createEntityAdapter<GroupI>();

const groupInit =  groupsAdapter.getInitialState({
   loading: false,
   error: false,
   loaded: false
})

interface StateI {
   groups: typeof groupInit,
   group: {
      data: null | GroupI,
      loading: boolean,
      error: boolean
   }
}

const initialState: StateI = {
   groups: groupInit,
   group: {
      loading: false,
      error: false,
      data: null
   }
};

const group = createSlice({
   name: 'group',
   initialState,
   reducers: {},
   extraReducers: {
      [fetchGroups.pending.toString()]: state => {
          state.groups = { ...state.groups, loaded: false, loading: true, error: false }
      },
      [fetchGroups.fulfilled.toString()]: (
         state,
         action: PayloadAction<GroupI[]>
      ) => {
         state.groups.loading = false
         state.groups.loaded = true
         state.groups.error = false
         groupsAdapter.setAll(state.groups, action.payload)
      },
      [fetchGroups.rejected.toString()]: state => {
         state.groups.loading = false
         state.groups.loaded = true
         state.groups.error = true
         groupsAdapter.removeAll(state.groups)
      },
      [fetchGroup.pending.toString()]: state => {
         state.group = {error: false, loading: true, data: null }
      },
      [fetchGroup.fulfilled.toString()]: (
         state,
         action: PayloadAction<GroupI>
      ) => {
         state.group = {error: false, loading: false, data: action.payload }
      },
      [fetchGroup.rejected.toString()]: state => {
         state.group = {error: true, loading: false, data: null }
      },
   },
});

export const {} = group.actions;

export default group.reducer;
