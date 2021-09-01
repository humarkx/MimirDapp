import apiClient from '../api'

export async function login() {
	return apiClient
		.post('/login', {})
		.then(response => {
			if (response) {
				return response.data
			}
			throw new Error('No response from Login')
		})
		.catch(err => {
			throw err
		})
}

export async function register(email: string, username: string) {
	return apiClient
		.post('/createUser', {
			email,
			username,
		})
		.then(response => {
			if (response) {
				return response.data
			}
			throw new Error('No response from Registration')
		})
		.catch(err => {
			throw err
		})
}

export async function logout() {
	return apiClient
		.get('/auth/logout')
		.then(() => {
			// store.remove('accessToken')
			return true
		})
		.catch(err => {
			throw err
		})
}

export async function getUser() {
	return apiClient
		.get('/user')
		.then(response => {
			if (response) {
				return response.data
			}
			throw new Error('No response from get user')
		})
		.catch(err => {
			throw err
		})
}
