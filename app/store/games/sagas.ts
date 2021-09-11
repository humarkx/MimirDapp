import { eventChannel } from 'redux-saga'
import { all, call, put, take, takeLatest } from 'redux-saga/effects'
import { SocketEvents } from '../../@types'
import { GameModel } from '../../@types/games'
import { getFreeGames, getPaidGames } from '../../services/games'
import socket from '../../services/sockets'
import { GameActions } from './types'

function createSocketChannel() {
	return eventChannel(emit => {
		const socketEventHandler = (event: any) => {
			emit(event)
		}
		const errorHandler = (errorEvent: any) => {
			emit(new Error(errorEvent.reason))
		}
		socket.on('connect', () => console.log('WE ARE CONNECTED ON SAGAS:::::'))

		// When someone joins a ROOM:
		// Size: number of players in the room
		socket.on('RoomEnter', () => console.log('WE ARE CONNECTED ON SAGAS:::::'))

		// Starting Game


		socket.on('endGame', () => console.log('WE ARE CONNECTED ON SAGAS:::::endGame'))
		socket.on('results', () => console.log('WE ARE CONNECTED ON SAGAS:::::results'))
		socket.on('result', () => console.log('WE ARE CONNECTED ON SAGAS:::::result'))
		socket.on('question', () => console.log('WE ARE CONNECTED ON SAGAS:::::question'))

		socket.on(SocketEvents.END_GAME, socketEventHandler)
		socket.on(SocketEvents.ERROR, errorHandler)

		return () => {
			socket.off(SocketEvents.MESSAGE_GET, socketEventHandler)
		}
	})
}

export function* SUBSCRIBE_TO_ALL_GAMES() {
	const socketChannel = yield call(createSocketChannel)
	while (true) {
		try {
			// An error from socketChannel will cause the saga jump to the catch block
			const socketEvent = yield take(socketChannel)
			switch (socketEvent.type) {
				// case SocketEvents.END_GAME:
				// 	yield put({
				// 		type: GameActions.NEW_SUBSCRIBED_CHAT_MESSAGE.toString(),
				// 		payload: socketEvent,
				// 	})
				// 	break
				// case SocketEvents.IS_TYPING:
				// 	yield put({
				// 		type: GameActions.USER_IS_TYPING.toString(),
				// 		payload: socketEvent,
				// 	})
				// 	break
				case 'connect':
					console.log('SUBSCRIBED CONNECT')
					break
				default:
					break
			}
		} catch (err) {
			console.error('socket error:', err)
			// socketChannel is still open in catch block
			// if we want end the socketChannel, we need close it explicitly
			// socketChannel.close()
		}
	}
}

function* GET_FREE_GAMES() {
	try {
		const freeGames: GameModel[] = yield call(getFreeGames)
		console.log('FREEEEEE:::', freeGames)
		yield put({
			type: GameActions.GET_FREE_GAMES_SUCCESS.toString(),
			payload: freeGames,
		})
	} catch (error) {
		console.log('Failing to get free games', error.message)
		yield put({
			type: GameActions.GET_FREE_GAMES_FAILED.toString(),
			payload: error,
		})
	}
}


function* GET_PAID_GAMES() {
	try {
		const paidGames: GameModel[] = yield call(getPaidGames)
		console.log('PAID:::::', paidGames)
		yield put({
			type: GameActions.GET_PAID_GAMES_SUCCESS.toString(),
			payload: paidGames,
		})
	} catch (error) {
		console.log('Failing to get paid games', error.message)
		yield put({
			type: GameActions.GET_PAID_GAMES_FAILED.toString(),
			payload: error,
		})
	}
}

export default function* rootSaga() {
	yield all([
		takeLatest(GameActions.GET_FREE_GAMES, GET_FREE_GAMES),
		takeLatest(GameActions.GET_PAID_GAMES, GET_PAID_GAMES),
		takeLatest(GameActions.SUBSCRIBE_TO_ALL_GAMES, SUBSCRIBE_TO_ALL_GAMES),
	])
}
