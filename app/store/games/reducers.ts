import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { GameModel } from '../../@types/games'
import { CurrentQuestionModel, GameActions } from './types'

export interface GameState {
	currentGame: GameModel | null
	currentQuestion: CurrentQuestionModel | null
	games: GameModel[]
	latestPrizeWon: number
	loading: boolean
	loadingQuestion: boolean
	error: unknown | null
}

const matchesInitialState: GameState = {
	currentGame: null,
	currentQuestion: null,
	games: [],
	latestPrizeWon: 0,
	loading: false,
	loadingQuestion: false,
	error: null,
}

const GamesReducer = reducerWithInitialState(matchesInitialState)
	// LOADING CASES
	.case(GameActions.SET_CURRENT_GAME, state => ({ ...state, loading: true }))
	.case(GameActions.SET_LATEST_PRIZE, state => ({ ...state, loading: true }))
	.case(GameActions.SHOW_QUESTION_RESULT, state => ({ ...state, loadingQuestion: true }))
	.case(GameActions.GET_FREE_GAMES, state => ({ ...state, loading: true }))
	.case(GameActions.GET_PAID_GAMES, state => ({ ...state, loading: true }))
	.case(GameActions.REMOVE_CURRENT_GAME, state => ({ ...state, loading: true }))

	// SUCCESS CASES
	.case(GameActions.SET_CURRENT_QUESTION_SUCCESS, (state, currentQuestion) => ({
		...state,
		currentQuestion,
		loadingQuestion: false,
	}))
	.case(GameActions.REMOVE_CURRENT_GAME_SUCCESS, state => ({
		...matchesInitialState,
		latestPrizeWon: state.latestPrizeWon,
	}))
	.case(GameActions.SET_LATEST_PRIZE_SUCCESS, (state, latestPrizeWon) => ({
		...state,
		latestPrizeWon,
	}))
	.case(GameActions.SHOW_QUESTION_RESULT_SUCCESS, (state, showResult) => ({
		...state,
		currentQuestion: {
			...state.currentQuestion,
			showResult,
		},
		loadingQuestion: false,
	}))
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
	.case(GameActions.SET_CURRENT_QUESTION_FAILED, (state, error) => ({ ...state, error, loadingQuestion: false }))
	.case(GameActions.SHOW_QUESTION_RESULT_FAILED, (state, error) => ({ ...state, error, loadingQuestion: false }))
	.case(GameActions.SET_LATEST_PRIZE_FAILED, (state, error) => ({ ...state, error }))
	.case(GameActions.REMOVE_CURRENT_GAME_FAILED, (state, error) => ({ ...state, loading: false }))

	// DEFAULT CASE - Return current state
	.default((state, action) => state)

export default GamesReducer
