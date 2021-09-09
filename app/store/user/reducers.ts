import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { UserActions, UserPayload } from './types'

export interface AuthState extends UserPayload {
	authorized?: boolean // false is default value
	loading: boolean
	error: string | null
}
const userInitialState: AuthState = {
	refId: null,
	email: null,
	username: null,
	firstName: null,
	lastName: null,
	avatar: null,
	country: null,
	roles: null,
	walletBalance: 1546,
	authorized: false, // false is default value
	status: null, // false is default value
	loading: false,
	error: null,
}

const authReducer = reducerWithInitialState(userInitialState)
	// LOADING CASES
	.case(UserActions.LOAD_CURRENT_ACCOUNT, state => ({ ...state, loading: true }))
	.case(UserActions.REGISTER, state => ({ ...state, loading: true }))
	.case(UserActions.LOGOUT, state => ({ ...state, loading: true }))
	.case(UserActions.GET_USER, state => ({ ...state, loading: true }))
	// SUCCESS CASES
	.case(UserActions.LOAD_CURRENT_ACCOUNT_SUCCESS, (state, user) => ({
		...state,
		...user,
		authorized: true,
		loading: false,
	}))
	.case(UserActions.GET_USER_SUCCESS, (state, user) => ({
		...state,
		...user,
		loading: false,
	}))
	.case(UserActions.REGISTER_SUCCESS, (state, user) => ({ ...state, ...user, loading: false }))
	.case(UserActions.LOGOUT_SUCCESS, () => ({
		...userInitialState,
		loading: false,
	}))

	// FAILED CASES
	.case(UserActions.LOAD_CURRENT_ACCOUNT_FAILED, (state, auth) => ({
		...state,
		...auth,
		loading: false,
	}))
	.case(UserActions.REGISTER_FAILED, state => ({ ...state, loading: false }))
	.case(UserActions.GET_USER_FAILED, state => ({ ...state, loading: false }))

	// DEFAULT CASE - Return current state
	.default((state, action) => state)

export default authReducer
