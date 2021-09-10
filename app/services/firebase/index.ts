import auth from '@react-native-firebase/auth'
import { Alert } from 'react-native'
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
			if (error.code === 'auth/email-already-in-use') {
				Alert.alert('That email address is already in use!')
				console.log('That email address is already in use!')
				return
			}

			if (error.code === 'auth/invalid-email') {
				Alert.alert('That email address is invalid!')
				console.log('That email address is invalid!')
				return
			}
			if (error.code === 'auth/weak-password') {
				Alert.alert('The given password is invalid.')
				console.log('That email address is invalid!')
				return
			}
			Alert.alert(error.message)
			console.error(error)
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
