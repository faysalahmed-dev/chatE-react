import { getGroups, getGroup } from '@/api/group.api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGroups = createAsyncThunk(
   'group/fetchGroups',
   async () => await getGroups()
);

export const fetchGroup = createAsyncThunk(
   'group/fetchGroup',
   async (slug: string) => await getGroup(slug)
);
