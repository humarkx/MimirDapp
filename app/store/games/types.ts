import actionCreatorFactory from 'typescript-fsa'
import { GameModel } from '../../@types/games'

const actionCreator = actionCreatorFactory()

export interface ErrorPayload {
	loading: boolean
	error: string | null
}

export enum ActionsTypes {
	SUBSCRIBE_TO_ALL_GAMES = 'SUBSCRIBE_TO_ALL_GAMES',
	GET_FREE_GAMES = 'GET_FREE_GAME',
	GET_FREE_GAMES_SUCCESS = 'GET_FREE_GAME_SUCCESS',
	GET_FREE_GAMES_FAILED = 'GET_FREE_GAME_FAILED',
}
export const GameActions = {
	GET_FREE_GAMES: actionCreator(ActionsTypes.GET_FREE_GAMES),
	GET_FREE_GAMES_SUCCESS: actionCreator<GameModel[]>(ActionsTypes.GET_FREE_GAMES_SUCCESS),
	GET_FREE_GAMES_FAILED: actionCreator<ErrorPayload>(ActionsTypes.GET_FREE_GAMES_FAILED),
	SUBSCRIBE_TO_ALL_GAMES: actionCreator(ActionsTypes.SUBSCRIBE_TO_ALL_GAMES),
}

export type GameActionsTypes =
	| ReturnType<typeof GameActions.GET_FREE_GAMES>
	| ReturnType<typeof GameActions.GET_FREE_GAMES_SUCCESS>
	| ReturnType<typeof GameActions.GET_FREE_GAMES_FAILED>
	| ReturnType<typeof GameActions.SUBSCRIBE_TO_ALL_GAMES>