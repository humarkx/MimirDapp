export interface Option {
	_id: string
	correct: boolean
	text: string
}

export interface Question {
	_id: string
	categories: string[]
	dificulty: number
	options: Option[]
	refId: string
	text: string
	title: string
}
