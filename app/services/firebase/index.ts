import auth from '@react-native-firebase/auth'
import socket from '../sockets'

export async function login(email: string, password: string) {
	return auth()
		.signInWithEmailAndPassword(email, password)
		.then(() => true)
		.catch(error => {
			throw error
		})
}

export async function register(email: string, password: string, name: any) {
	return auth()
		.createUserWithEmailAndPassword(email, password)
		.then(async response => {
			if (response.user) {
				return response.user
			}
			throw new Error('Response but no user')
		})
		.catch(error => {
			throw error
		})
}
export async function updateUserPassword(newPassword: string) {
	return new Promise((resolve, reject) => {
		const user = auth().currentUser
		if (!user) {
			reject(new Error('No user token'))
		} else {
			user
				.updatePassword(newPassword)
				.then(() => {
					resolve(true)
				})
				.catch(error => {
					reject(new Error(error))
				})
		}
	})
}

export async function currentAccount() {
	return new Promise((resolve, reject) => {
		auth().onAuthStateChanged(user => {
			if (!user) {
				socket.io.opts.query = { token: '' }
				reject(new Error('No user token'))
			} else {
				user.getIdToken().then(token => {
					console.log('::::::::::::::::::::: FIREBASE GOT TOKEN :::::::::::::::: ')
					socket.io.opts.query = { token: token ?? '' }
					socket.connect()
				})
			}
			resolve(true)
		})
	})
}

export async function logout() {
	return auth()
		.signOut()
		.then(() => socket.disconnect())
}
