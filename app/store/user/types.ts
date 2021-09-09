import actionCreatorFactory from 'typescript-fsa'

const actionCreator = actionCreatorFactory()

export interface ErrorPayload {
	loading: boolean
	error: string | null
}

export interface UserLoginPayload {
	email: string
	password: string
}

export interface UserPayload {
	refId: string | null
	email: string | null
	username: string | null
	firstName?: string | null
	lastName?: string | null
	avatar?: string | null
	banner?: string | null
	country?: string | null
	walletBalance?: number | null
	roles?: Array<string> | null
	authorized?: boolean // false is default value
	status?: string | null // false is default value
}

export interface UserRegisterPayload {
	email: string
	username: string
	password: string
}
export enum ActionsTypes {
	SET_STATE = 'user/SET_STATE',
	LOGIN = 'LOGIN',
	REGISTER = 'user/REGISTER',
	GET_USER = 'GET_USER',
	GET_USER_SUCCESS = 'GET_USER_SUCCESS',
	GET_USER_FAILED = 'GET_USER_FAILED',
	LOAD_CURRENT_ACCOUNT = 'LOAD_CURRENT_ACCOUNT',
	LOAD_CURRENT_ACCOUNT_FAILED = 'LOAD_CURRENT_ACCOUNT_FAILED',
	LOAD_CURRENT_ACCOUNT_SUCCESS = 'LOAD_CURRENT_ACCOUNT_SUCCESS',
	LOGOUT = 'LOGOUT',
	LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
	REGISTER_SUCCESS = 'REGISTER_SUCCESS',
	REGISTER_FAILED = 'REGISTER_FAILED',
}
export const UserActions = {
	SET_STATE: actionCreator<ErrorPayload>(ActionsTypes.SET_STATE),
	LOGIN: actionCreator<UserLoginPayload>(ActionsTypes.LOGIN),
	REGISTER: actionCreator<UserRegisterPayload>(ActionsTypes.REGISTER),
	REGISTER_SUCCESS: actionCreator<UserPayload>(ActionsTypes.REGISTER_SUCCESS),
	REGISTER_FAILED: actionCreator<UserPayload>(ActionsTypes.REGISTER_FAILED),
	LOAD_CURRENT_ACCOUNT: actionCreator(ActionsTypes.LOAD_CURRENT_ACCOUNT),
	LOAD_CURRENT_ACCOUNT_FAILED: actionCreator<ErrorPayload>(ActionsTypes.LOAD_CURRENT_ACCOUNT_FAILED),
	LOAD_CURRENT_ACCOUNT_SUCCESS: actionCreator<UserPayload>(ActionsTypes.LOAD_CURRENT_ACCOUNT_SUCCESS),
	LOGOUT: actionCreator<UserLoginPayload>(ActionsTypes.LOGOUT),
	LOGOUT_SUCCESS: actionCreator(ActionsTypes.LOGOUT_SUCCESS),

	GET_USER: actionCreator(ActionsTypes.GET_USER),
	GET_USER_SUCCESS: actionCreator<UserPayload>(ActionsTypes.GET_USER_SUCCESS),
	GET_USER_FAILED: actionCreator<ErrorPayload>(ActionsTypes.GET_USER_FAILED),
}

export type UserActionsTypes =
	| ReturnType<typeof UserActions.SET_STATE>
	| ReturnType<typeof UserActions.LOGIN>
	| ReturnType<typeof UserActions.REGISTER>
	| ReturnType<typeof UserActions.REGISTER_SUCCESS>
	| ReturnType<typeof UserActions.REGISTER_FAILED>
	| ReturnType<typeof UserActions.LOAD_CURRENT_ACCOUNT>
	| ReturnType<typeof UserActions.LOAD_CURRENT_ACCOUNT_SUCCESS>
	| ReturnType<typeof UserActions.LOAD_CURRENT_ACCOUNT_FAILED>
	| ReturnType<typeof UserActions.LOGOUT>
	| ReturnType<typeof UserActions.GET_USER>
	| ReturnType<typeof UserActions.GET_USER_SUCCESS>
	| ReturnType<typeof UserActions.GET_USER_FAILED>
