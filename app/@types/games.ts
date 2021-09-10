import { Question } from './question'
import { UserModel } from './user'

export interface GameModel {
	_id: string
	players: UserModel[]
	questions: Question[]
	refId: string
	minPlayers: number
	results: {
		player: UserModel
		alive: boolean
		score: number
	}[]
	startDate: Date
	status: string
	type: string
}
