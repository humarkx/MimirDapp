import { API_URL } from '@env'
import { io } from 'socket.io-client'

const socket = io(API_URL, {
	transports: ['websocket'],
	withCredentials: true,
	autoConnect: false,
})

socket.on('disconnect', (reason: string) => {
	console.log('::::::::::::::::::::: SOCKET DISCONNECTED :::::::::::::::: ')
	console.log(':::::::::::::::: ', reason)
	if (reason === 'transport close') {
		setTimeout(() => {
			socket.connect()
		}, 2000)
	}
})

socket.on('reconnect', () => {
	console.log('::::::::::::::::::::: SOCKET RE RE CONNECTED :::::::::::::::: ')
})

socket.on('connect', () => {
	console.log('::::::::::::::::::::: SOCKET CONNECTED :::::::::::::::: ')
})

export default socket
