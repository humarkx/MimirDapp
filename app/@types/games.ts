import { Question } from './question'
import { UserModel } from './user'

export enum GameStatus {
	OPEN = 'OPEN',
	STARTING = 'STARTING',
	PLAYING = 'PLAYING',
	CLOSED = 'CLOSED',
}

export enum GameType {
	FREE = 'FREE',
	BET = 'BET',
}
export interface GameModel {
	_id: string
	players: UserModel[]
	questions: Question[]
	refId: string
	minPlayers: number
	fee: string
	results: {
		player: UserModel
		alive: boolean
		score: number
	}[]
	startDate: Date
	status: GameStatus
	type: GameType
}
