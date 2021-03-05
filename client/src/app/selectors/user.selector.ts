import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/app/rootReducer';

export const userSelector = (state: RootState) => state.user;

export const isAuthenticatedSelector = createSelector(
   userSelector,
   user => !!user.token && !!user.user
);

export const authStateSelector = createSelector(
   [userSelector, isAuthenticatedSelector],
   (user, isAuthenticated) => ({
      authStateLoaded: user.authStateLoaded,
      loading: user.loading,
      isAuthenticated,
   })
);

export const userDataSelector = createSelector(userSelector, user => user.user);
