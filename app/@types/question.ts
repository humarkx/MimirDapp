export interface Option {
	_id: string
	text: string
	correct: boolean
}

export interface Question {
	_id: string
	refId: string
	title: string
	text: string
	options: Option[]
	dificulty: number
	categories: string[]
}
