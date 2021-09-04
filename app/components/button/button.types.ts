const buttonVariants = [
	'dark',
	'default',
	'faded',
	'ghost',
	'mono',
	'primary',
	'secondary',
	'success',
	'warning',
] as const
export type ButtonVariants = typeof buttonVariants[number]

const buttonSizes = ['default', 'large', 'medium', 'small'] as const
export type ButtonSizes = typeof buttonSizes[number]

const buttonTypes = ['solid', 'clear', 'outline'] as const
export type ButtonTypes = typeof buttonTypes[number]
