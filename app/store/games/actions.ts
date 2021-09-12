import { GameModel } from '../../@types/games'
import { GameActions } from './types'

export const setCurrentGame = (game: GameModel) => {
	return GameActions.SET_CURRENT_GAME(game)
}

export const getFreeGames = () => {
	return GameActions.GET_FREE_GAMES()
}

export const getPaidGames = () => {
	return GameActions.GET_PAID_GAMES()
}

