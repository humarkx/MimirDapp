import { API_URL } from '@env'
import auth from '@react-native-firebase/auth'
import axios from 'axios'

const apiClient = axios.create({
	baseURL: API_URL,
	// timeout: 1000,
	// headers: { 'X-Custom-Header': 'foobar' }
})

apiClient.interceptors.response.use(undefined, error => {
	console.log('ERROR DATA::::::', error)
	// Errors handling
	const { response } = error
	const { data } = response
	if (data) {
		console.log('ERROR DATA::::::', data.message)
		return Promise.reject(data)
	}
	return Promise.reject(error)
})

const getIdTokenRefreshed = async () => {
	return new Promise(resolve => {
		const unsubscribe = auth().onAuthStateChanged(async user => {
			if (!user) {
				resolve('')
			} else {
				user.getIdToken().then(token => {
					resolve(token)
				})
			}
			unsubscribe()
		})
	})
}

apiClient.interceptors.request.use(
	async request => {
		const token = await getIdTokenRefreshed()
		request.headers = {
			Authorization: token,
		}
		return request
	},
	error => {
		Promise.reject(error)
	},
)

// apiClient.interceptors.request.use(
//   async request => {
//     await firebaseAuth.currentUser?.getIdToken().then(token => {
//       request.headers = {
//         Authorization: token,
//       }
//     })
//     return request
//   },
//   error => {
//     Promise.reject(error)
//   },
// )

export default apiClient
