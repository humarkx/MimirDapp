import actionCreatorFactory from 'typescript-fsa'
import { GameModel } from '../../@types/games'
import { QuestionModel } from '../../@types/question'

const actionCreator = actionCreatorFactory()

export interface ErrorPayload {
	loading: boolean
	error: string | null
}

export interface CurrentQuestionModel {
	question: QuestionModel
	index: number
}

export enum ActionsTypes {
	SUBSCRIBE_TO_ALL_GAMES = 'SUBSCRIBE_TO_ALL_GAMES',
	SET_CURRENT_GAME = 'SET_CURRENT_GAME',
	SET_CURRENT_GAME_SUCCESS = 'SET_CURRENT_GAME_SUCCESS',
	SET_CURRENT_GAME_FAILED = 'SET_CURRENT_GAME_FAILED',
	GET_FREE_GAMES = 'GET_FREE_GAME',
	GET_FREE_GAMES_SUCCESS = 'GET_FREE_GAME_SUCCESS',
	GET_FREE_GAMES_FAILED = 'GET_FREE_GAME_FAILED',
	GET_PAID_GAMES = 'GET_PAID_GAMES',
	GET_PAID_GAMES_SUCCESS = 'GET_PAID_GAMES_SUCCESS',
	GET_PAID_GAMES_FAILED = 'GET_PAID_GAMES_FAILED',
	SET_CURRENT_QUESTION = 'SET_CURRENT_QUESTION',
	SET_CURRENT_QUESTION_SUCCESS = 'SET_CURRENT_QUESTION_SUCCESS',
	SET_CURRENT_QUESTION_FAILED = 'SET_CURRENT_QUESTION_FAILED',
}

export const GameActions = {
	SET_CURRENT_GAME: actionCreator<GameModel>(ActionsTypes.SET_CURRENT_GAME),
	SET_CURRENT_GAME_SUCCESS: actionCreator<GameModel>(ActionsTypes.SET_CURRENT_GAME_SUCCESS),
	SET_CURRENT_GAME_FAILED: actionCreator(ActionsTypes.SET_CURRENT_GAME_FAILED),
	GET_FREE_GAMES: actionCreator(ActionsTypes.GET_FREE_GAMES),
	GET_FREE_GAMES_SUCCESS: actionCreator<GameModel[]>(ActionsTypes.GET_FREE_GAMES_SUCCESS),
	GET_FREE_GAMES_FAILED: actionCreator<ErrorPayload>(ActionsTypes.GET_FREE_GAMES_FAILED),
	GET_PAID_GAMES: actionCreator(ActionsTypes.GET_PAID_GAMES),
	GET_PAID_GAMES_SUCCESS: actionCreator<GameModel[]>(ActionsTypes.GET_PAID_GAMES_SUCCESS),
	GET_PAID_GAMES_FAILED: actionCreator<ErrorPayload>(ActionsTypes.GET_PAID_GAMES_FAILED),
	SUBSCRIBE_TO_ALL_GAMES: actionCreator(ActionsTypes.SUBSCRIBE_TO_ALL_GAMES),
	SET_CURRENT_QUESTION: actionCreator<CurrentQuestionModel>(ActionsTypes.SET_CURRENT_QUESTION),
	SET_CURRENT_QUESTION_SUCCESS: actionCreator<CurrentQuestionModel>(ActionsTypes.SET_CURRENT_QUESTION_SUCCESS),
	SET_CURRENT_QUESTION_FAILED: actionCreator<ErrorPayload>(ActionsTypes.SET_CURRENT_QUESTION_FAILED),
}

export type GameActionsTypes =
	| ReturnType<typeof GameActions.GET_FREE_GAMES>
	| ReturnType<typeof GameActions.GET_FREE_GAMES_SUCCESS>
	| ReturnType<typeof GameActions.GET_FREE_GAMES_FAILED>
	| ReturnType<typeof GameActions.GET_PAID_GAMES>
	| ReturnType<typeof GameActions.GET_PAID_GAMES_SUCCESS>
	| ReturnType<typeof GameActions.GET_PAID_GAMES_FAILED>
	| ReturnType<typeof GameActions.SUBSCRIBE_TO_ALL_GAMES>
	| ReturnType<typeof GameActions.SET_CURRENT_GAME>
	| ReturnType<typeof GameActions.SET_CURRENT_GAME_SUCCESS>
	| ReturnType<typeof GameActions.SET_CURRENT_GAME_FAILED>
	| ReturnType<typeof GameActions.SET_CURRENT_QUESTION>
	| ReturnType<typeof GameActions.SET_CURRENT_QUESTION_SUCCESS>
	| ReturnType<typeof GameActions.SET_CURRENT_QUESTION_FAILED>
