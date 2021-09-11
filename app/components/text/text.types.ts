const Text = [
	'danger',
	'dark',
	'default',
	'faded',
	'ghost',
	'highlighted',
	'info',
	'primary',
	'secondary',
	'success',
	'warning',
	'white',
	'black',
] as const
export type TextColorVariants = typeof Text[number]
