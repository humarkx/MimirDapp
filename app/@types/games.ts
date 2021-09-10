import { Question } from './question'
import { UserModel } from './user'

export interface GameModel {
	_id: string
	refId: string
	players: UserModel[]
	questions: Question[]
	results: {
		player: UserModel
		alive: boolean
		score: number
	}[]
	type: string
	status: string
	startDate: Date
	minPlayers: number
}
