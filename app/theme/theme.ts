import { color } from './color'
import { Colors, colors } from './colors'
import { spacing, Spacing } from './spacing'
import { typography, Typography } from './typography'

export interface ThemeType {
	dark: boolean
	spacing: Spacing
	typography: Typography
	colors: Colors
	color: unknown
}

export const lightTheme: ThemeType = {
	dark: false,
	spacing: spacing,
	typography: typography,
	colors: colors,
	color: color,
}

export const darkTheme: ThemeType = {
	dark: true,
	spacing: spacing,
	typography: typography,
	colors: colors,
	color: color,
}
