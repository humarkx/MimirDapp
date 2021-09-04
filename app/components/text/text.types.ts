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
] as const
export type TextColorVariants = typeof Text[number]
