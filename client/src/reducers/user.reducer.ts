import { useReducer, useCallback } from 'react';
import { logoutUser as logoutUserAction } from '@/context/user/user.actions';

enum Types {
	SET_USER,
	AUTH_STATE_LOADED,
	LOGOUT_USER
}
export type SET_USER_PROP = Pick<StateI, 'token' | 'user'>
export interface StateI {
	readonly user: {
		name: string;
		email: string;
		username: string;
		avatar: string;
	} | null
	readonly token: string | null;
	readonly authStateLoaded: boolean;
}

type Action = {
	readonly type: Types.SET_USER,
	readonly payload: SET_USER_PROP
} | { readonly type: Types.AUTH_STATE_LOADED } | {type: Types.LOGOUT_USER }


const UseReducer = (state: StateI, action: Action) => {
	switch (action.type) {
		case Types.SET_USER:
			const { user, token } = action.payload;
			return { ...state, user, token, authStateLoaded: true }
		case Types.AUTH_STATE_LOADED:
			return { ...state, authStateLoaded: true }
		case Types.LOGOUT_USER: 
			return { user: null, token: null, authStateLoaded: true }
		default:
			return state;
	}
}

export interface UserReducerT extends StateI { 
	isAuthenticated: boolean, 
	setUser(user: SET_USER_PROP): void
	resolvedAuthState(): void,
	logoutUser():void
}

const initState = {
	user: null,
	token: null,
	authStateLoaded: false
}


export default function UserReducer ():UserReducerT {
	const [userState, dispatch] = useReducer(UseReducer, initState);
	const setUser = useCallback((userObj: SET_USER_PROP ) => 
			dispatch({ type: Types.SET_USER, payload: userObj }), [])
	const resolvedAuthState= useCallback(() => dispatch({ type: Types.AUTH_STATE_LOADED }), [])
	const logoutUser = useCallback(() => {
		dispatch({ type: Types.LOGOUT_USER })
		logoutUserAction()
	}, [])
	const isAuthenticated = !!userState.token && !!userState.user
	return { setUser, logoutUser, resolvedAuthState, isAuthenticated, ...userState };
}