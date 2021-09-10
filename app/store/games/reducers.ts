import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { GameModel } from '../../@types/games'
import { GameActions } from './types'

export interface GameState {
	currentGame: GameModel | null
	freeGames: GameModel[]
	loading: boolean
	error: unknown | null
}

const matchesInitialState: GameState = {
	currentGame: null,
	freeGames: [],
	loading: false,
	error: null,
}

const GamesReducer = reducerWithInitialState(matchesInitialState)
	// LOADING CASES
	.case(GameActions.GET_FREE_GAMES, state => ({ ...state, loading: true }))

	// SUCCESS CASES
	.case(GameActions.GET_FREE_GAMES_SUCCESS, (state, freeGames) => ({
		...state,
		freeGames,
		loading: false,
	}))

	// FAILED CASES
	.case(GameActions.GET_FREE_GAMES_FAILED, (state, error) => ({ ...state, error, loading: false }))

	// DEFAULT CASE - Return current state
	.default((state, action) => state)

export default GamesReducer
