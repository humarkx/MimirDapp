import apiClient from '../api'

export async function getFreeGames() {
	return apiClient
		.get('/game/free')
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
