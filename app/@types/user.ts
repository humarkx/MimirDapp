export interface UserModel {
	_id: string
	avatar?: string
	banner?: string
	country?: string
	email: string
	firstName?: string
	lastName?: string
	log: { date?: Date; action: string; logged: string[] }[]
	refId: string
	roles: string[]
	username: string
	walletBalance: number
}
