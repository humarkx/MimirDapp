import { eventChannel } from 'redux-saga'
import { all, call, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { SocketEvents } from '../../@types'
import { GameModel } from '../../@types/games'
import { navigationRef } from '../../navigators'
import { getFreeGames, getPaidGames } from '../../services/games'
import socket from '../../services/sockets'
import { CurrentQuestionModel, GameActions, GameActionsTypes } from './types'

function createSocketChannel() {
	return eventChannel(emit => {
		const socketEventHandler = (event: any) => {
			emit(event)
		}
		const errorHandler = (errorEvent: any) => {
			emit(new Error(errorEvent.reason))
		}

		socket.on(SocketEvents.STARTING, socketEventHandler)
		socket.on(SocketEvents.ROOM_ENTER, socketEventHandler)
		socket.on(SocketEvents.START_GAME, socketEventHandler)
		socket.on(SocketEvents.QUESTION, socketEventHandler)
		socket.on(SocketEvents.RESULTS, socketEventHandler)
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
				case SocketEvents.STARTING:
					yield put({
						type: GameActions.SET_CURRENT_GAME.toString(),
						payload: socketEvent.event.game,
					})
					break
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
						type: GameActions.SET_CURRENT_GAME.toString(),
						payload: socketEvent.event.game,
					})
					yield put({
						type: GameActions.SET_CURRENT_QUESTION.toString(),
						payload: {
							question: socketEvent.event.question,
							index: socketEvent.event.index,
							showResult: false,
							totalPlayers: socketEvent.event.totalPlayers,
							dead: socketEvent.event.dead,
							alive: socketEvent.event.alive,
						},
					})
					break
				case SocketEvents.RESULTS:
					yield put({
						type: GameActions.SHOW_QUESTION_RESULT.toString(),
						payload: true,
					})
					break
				case SocketEvents.END_GAME:
					yield put({
						type: GameActions.SET_LATEST_PRIZE.toString(),
						payload: socketEvent.event.prize,
					})
					console.log('NAVIGATING TO FINAL')
					navigationRef.navigate('MainStack', {
						screen: 'Final',
					})
					// yield put({
					// 	type: GameActions.SET_CURRENT_QUESTION.toString(),
					// 	payload: null,
					// })
					// yield put({
					// 	type: GameActions.SET_CURRENT_GAME.toString(),
					// 	payload: null,
					// })
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

function* SET_CURRENT_QUESTION(action: GameActionsTypes) {
	try {
		console.log('SET_CURRENT_QUESTION', action.payload)
		const currentQuestion = action.payload as CurrentQuestionModel

		yield put({
			type: GameActions.SET_CURRENT_QUESTION_SUCCESS.toString(),
			payload: currentQuestion,
		})
	} catch (error) {
		console.log('Failed to set current question', error.message)
		yield put({
			type: GameActions.SET_CURRENT_QUESTION_FAILED.toString(),
			payload: error,
		})
	}
}

function* SHOW_QUESTION_RESULT(action: GameActionsTypes) {
	try {
		console.log('SHOW_QUESTION_RESULT', action.payload)
		yield put({
			type: GameActions.SHOW_QUESTION_RESULT_SUCCESS.toString(),
			payload: action.payload,
		})
	} catch (error) {
		console.log('Failed to set showResult', error.message)
		yield put({
			type: GameActions.SHOW_QUESTION_RESULT_FAILED.toString(),
			payload: error,
		})
	}
}

function* SET_LATEST_PRIZE(action: GameActionsTypes) {
	try {
		console.log('SET_LATEST_PRIZE', action.payload)
		yield put({
			type: GameActions.SET_LATEST_PRIZE_SUCCESS.toString(),
			payload: action.payload,
		})
		// yield put({
		// 	type: GameActions.SET_CURRENT_QUESTION.toString(),
		// 	payload: null,
		// })
		// yield put({
		// 	type: GameActions.SET_CURRENT_GAME.toString(),
		// 	payload: null,
		// })
	} catch (error) {
		console.log('Failed to set showResult', error.message)
		yield put({
			type: GameActions.SET_LATEST_PRIZE_FAILED.toString(),
			payload: error,
		})
	}
}

function* REMOVE_CURRENT_GAME() {
	try {
		yield put({
			type: GameActions.REMOVE_CURRENT_GAME_SUCCESS.toString(),
		})
	} catch (error) {
		console.log('Failed to remove current game', error.message)
		yield put({
			type: GameActions.REMOVE_CURRENT_GAME_FAILED.toString(),
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
		takeEvery(GameActions.SET_CURRENT_GAME, SET_CURRENT_GAME),
		takeEvery(GameActions.SET_CURRENT_QUESTION, SET_CURRENT_QUESTION),
		takeEvery(GameActions.SHOW_QUESTION_RESULT, SHOW_QUESTION_RESULT),
		takeEvery(GameActions.SET_LATEST_PRIZE, SET_LATEST_PRIZE),
		takeLatest(GameActions.GET_FREE_GAMES, GET_FREE_GAMES),
		takeLatest(GameActions.GET_PAID_GAMES, GET_PAID_GAMES),
		takeLatest(GameActions.SUBSCRIBE_TO_ALL_GAMES, SUBSCRIBE_TO_ALL_GAMES),
		takeLatest(GameActions.REMOVE_CURRENT_GAME, REMOVE_CURRENT_GAME),
	])
}
