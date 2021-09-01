import { UserActions } from './types'

export const register = (username: string, email: string, password: string) => {
	console.log('VALUES', email, username, password)
	return UserActions.REGISTER({ username, email, password })
}

export const login = (email: string, password: string) => UserActions.LOGIN({ email, password })
