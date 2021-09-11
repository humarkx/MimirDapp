import apiClient from '../api'

export async function getFreeGames() {
	return apiClient
		.get('/freeGames')
		.then(response => {
			if (response) {
				return response.data
			}
			throw new Error('No get free games response data')
		})
		.catch(err => {
			throw err
		})
}

export async function getPaidGames() {
	return apiClient
		.get('/paidGames')
		.then(response => {
			if (response) {
				return response.data
			}
			throw new Error('No get paid games response data')
		})
		.catch(err => {
			throw err
		})
}
