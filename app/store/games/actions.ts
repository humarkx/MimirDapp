import { GameActions } from './types'

export const getFreeGames = () => {
	return GameActions.GET_FREE_GAMES()
}

export const getPaidGames = () => {
	return GameActions.GET_PAID_GAMES()
}
