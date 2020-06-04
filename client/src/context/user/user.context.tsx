import React, { createContext, Props } from 'react';
import useUserReducer, { UserReducerT } from '@/reducers/user.reducer';

export const UserContext = createContext<UserReducerT>({} as UserReducerT);

export default function UserContextProvider (props: Props<{}>) {
	const userState = useUserReducer();
	
	return (
		<UserContext.Provider value={userState}>
			{props.children}
		</UserContext.Provider>
	)
}