import { eventChannel } from 'redux-saga'
import { all, call, put, take, takeLatest } from 'redux-saga/effects'
import { MainParamList, SocketEvents } from '../../@types'
import { GameModel } from '../../@types/games'
import { getFreeGames, getPaidGames } from '../../services/games'
import socket from '../../services/sockets'
import { UserLoginPayload } from '../user/types'
import { GameState } from './reducers'
import { GameActions, GameActionsTypes } from './types'
import { navigationRef } from '../../navigators'

function createSocketChannel() {
	return eventChannel(emit => {
		const socketEventHandler = (event: any) => {
			emit(event)
		}
		const errorHandler = (errorEvent: any) => {
			emit(new Error(errorEvent.reason))
		}

		socket.on(SocketEvents.ROOM_ENTER, socketEventHandler)
		socket.on(SocketEvents.START_GAME, socketEventHandler)
		socket.on(SocketEvents.QUESTION, socketEventHandler)
		socket.on(SocketEvents.END_GAME, socketEventHandler)
		// socket.on('connect', () => console.log('WE ARE CONNECTED ON SAGAS:::::'))
		//
		// // When someone joins a ROOM:
		// // Size: number of players in the room
		// socket.on('RoomEnter', RoomEnter => console.log('WE ARE CONNECTED ON SAGAS:::::', RoomEnter))
		//
		// // Starting Game
		//
		// socket.on('endGame', endGame => console.log('WE ARE CONNECTED ON SAGAS:::::endGame', endGame))
		// socket.on('results', results => console.log('WE ARE CONNECTED ON SAGAS:::::results', results))
		// socket.on('result', result => console.log('WE ARE CONNECTED ON SAGAS:::::result', result))
		// socket.on('question', question => console.log('WE ARE CONNECTED ON SAGAS:::::question', question))
		//
		// socket.on(SocketEvents.END_GAME, socketEventHandler)
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
				case SocketEvents.ROOM_ENTER:
					yield put({
						type: GameActions.SET_CURRENT_GAME.toString(),
						payload: socketEvent.event.game,
					})
					break
				case SocketEvents.START_GAME:
					navigationRef.navigate('MainStack', {
						screen: 'question',
					})
					yield put({
						type: GameActions.SET_CURRENT_GAME.toString(),
						payload: socketEvent.event.game,
					})
					break
				case SocketEvents.QUESTION:
					yield put({
						type: GameActions.SET_CURRENT_QUESTION_SUCCESS.toString(),
						payload: {
							question: socketEvent.event.question,
							index: socketEvent.event.index,
						},
					})
					break
				case SocketEvents.END_GAME:
					navigationRef.navigate('MainStack', {
						screen: 'Final',
						params: {
							prize: socketEvent.event.prize,
						},
					})
					// TODO if currentGame.refId === the game that ended, lets remove it
					break
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

function* SET_CURRENT_GAME(action: GameActionsTypes) {
	try {
		console.log('SET_CURRENT_GAME', action.payload)
		const currentGame = action.payload as GameModel

		yield put({
			type: GameActions.SET_CURRENT_GAME_SUCCESS.toString(),
			payload: currentGame,
		})
	} catch (error) {
		console.log('Failed to set current game', error.message)
		yield put({
			type: GameActions.SET_CURRENT_GAME_FAILED.toString(),
			payload: error,
		})
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
		takeLatest(GameActions.SET_CURRENT_GAME, SET_CURRENT_GAME),
		takeLatest(GameActions.GET_FREE_GAMES, GET_FREE_GAMES),
		takeLatest(GameActions.GET_PAID_GAMES, GET_PAID_GAMES),
		takeLatest(GameActions.SUBSCRIBE_TO_ALL_GAMES, SUBSCRIBE_TO_ALL_GAMES),
	])
}
