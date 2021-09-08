import { Platform } from 'react-native'

const FontWeight = ['normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const
export type FontWeightVariants = typeof FontWeight[number]

export interface Text {
	fontFamily: string
	fontWeight: FontWeightVariants
	fontSize: number
	lineHeight: number
	letterSpacing?: number | string
}

const TypographyStringVariants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8'] as const
export type TypographyVariants = typeof TypographyStringVariants[number]

export type TypographyVariantsByKey = {
	[key in TypographyVariants]: Text
}

const weight: { [key: string]: FontWeightVariants } = {
	thin: '100',
	extraLight: '200',
	light: '300',
	regular: '400',
	medium: '500',
	semiBold: '600',
	bold: '700',
	black: '900',
}

export interface Typography extends TypographyVariantsByKey {
	primary: string
	secondary: string
	code: string
}

export const typography: Typography = {
	/**
	 * The primary font.  Used in most places.
	 */
	primary: Platform.select({ ios: 'Helvetica', android: 'normal' }),

	/**
	 * An alternate font used for perhaps titles and stuff.
	 */
	secondary: Platform.select({ ios: 'Arial', android: 'sans-serif' }),

	/**
	 * Lets get fancy with a monospace font!
	 */
	code: Platform.select({ ios: 'Courier', android: 'monospace' }),

	h1: {
		fontFamily: Platform.select({ ios: 'Helvetica', android: 'normal' }),
		fontWeight: weight.semiBold,
		fontSize: 24,
		lineHeight: 30,
	},
	h2: {
		fontFamily: Platform.select({ ios: 'Helvetica', android: 'normal' }),
		fontWeight: weight.semiBold,
		fontSize: 16,
		lineHeight: 26,
	},
	h3: {
		fontFamily: Platform.select({ ios: 'Helvetica', android: 'normal' }),
		fontWeight: weight.regular,
		fontSize: 16,
		lineHeight: 26,
	},
	h4: {
		fontFamily: Platform.select({ ios: 'Helvetica', android: 'normal' }),
		fontWeight: weight.bold,
		fontSize: 14,
		lineHeight: 18,
	},
	h5: {
		fontFamily: Platform.select({ ios: 'Helvetica', android: 'normal' }),
		fontWeight: weight.semiBold,
		fontSize: 14,
		lineHeight: 18,
	},
	h6: {
		fontFamily: Platform.select({ ios: 'Helvetica', android: 'normal' }),
		fontWeight: weight.regular,
		fontSize: 14,
		lineHeight: 18,
	},
	h7: {
		fontFamily: Platform.select({ ios: 'Helvetica', android: 'normal' }),
		fontWeight: weight.bold,
		fontSize: 12,
		lineHeight: 15,
	},
	h8: {
		fontFamily: Platform.select({ ios: 'Helvetica', android: 'normal' }),
		fontWeight: weight.regular,
		fontSize: 12,
		lineHeight: 15,
	},
}
