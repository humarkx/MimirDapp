import { all, call, put, takeLatest } from 'redux-saga/effects'
import { GameModel } from '../../@types/games'
import { getFreeGames } from '../../services/games'
import { GameActions } from './types'

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

export default function* rootSaga() {
	yield all([takeLatest(GameActions.GET_FREE_GAMES, GET_FREE_GAMES)])
}
