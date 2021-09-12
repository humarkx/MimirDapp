import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { GameModel } from '../../@types/games'
import { GameActions } from './types'

export interface GameState {
	currentGame: GameModel | null
	games: GameModel[]
	loading: boolean
	error: unknown | null
}

const matchesInitialState: GameState = {
	currentGame: null,
	games: [],
	loading: false,
	error: null,
}

const GamesReducer = reducerWithInitialState(matchesInitialState)
	// LOADING CASES
	.case(GameActions.SET_CURRENT_GAME, state => ({ ...state, loading: true }))
	.case(GameActions.GET_FREE_GAMES, state => ({ ...state, loading: true }))
	.case(GameActions.GET_PAID_GAMES, state => ({ ...state, loading: true }))

	// SUCCESS CASES
	.case(GameActions.SET_CURRENT_GAME_SUCCESS, (state, currentGame) => ({
		...state,
		currentGame,
		loading: false,
	}))
	.case(GameActions.GET_FREE_GAMES_SUCCESS, (state, games) => ({
		...state,
		games,
		loading: false,
	}))
	.case(GameActions.GET_PAID_GAMES_SUCCESS, (state, games) => ({
		...state,
		games,
		loading: false,
	}))
	// FAILED CASES
	.case(GameActions.SET_CURRENT_GAME_FAILED, (state, error) => ({ ...state, error, loading: false }))
	.case(GameActions.GET_FREE_GAMES_FAILED, (state, error) => ({ ...state, error, loading: false }))
	.case(GameActions.GET_PAID_GAMES_FAILED, (state, error) => ({ ...state, error, loading: false }))

	// DEFAULT CASE - Return current state
	.default((state, action) => state)

export default GamesReducer
