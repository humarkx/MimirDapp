export interface UserModel {
	_id: string
	refId: string
	username: string
	firstName?: string
	lastName?: string
	email: string
	avatar?: string
	banner?: string
	country?: string
	roles: string[]
	log: { date?: Date; action: string; logged: string[] }[]
}
