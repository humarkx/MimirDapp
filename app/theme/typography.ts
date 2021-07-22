import { Platform } from 'react-native'

/**
 * You can find a list of available fonts on both iOS and Android here:
 * https://github.com/react-native-training/react-native-fonts
 *
 * If you're interested in adding a custom font to your project,
 * check out the readme file in ./assets/fonts/ then come back here
 * and enter your new font name. Remember the Android font name
 * is probably different than iOS.
 * More on that here:
 * https://github.com/lendup/react-native-cross-platform-text
 *
 * The various styles of fonts are defined in the <Text /> component.
 */

export interface Text {
	fontFamily: string
	fontWeight: number
	fontSize: number | string
	lineHeight?: number | string
	letterSpacing?: number | string
}
export interface Typography {
	primary: string
	secondary: string
	code: string
	h1: Text
	h2: Text
	h3: Text
	h4: Text
	h5: Text
	h6: Text
	h7: Text
	h8: Text
	body: Text
	button: Text
}

const weight = {
	thin: 100,
	extraLight: 200,
	light: 300,
	regular: 400,
	medium: 500,
	semiBold: 600,
	bold: 700,
	black: 900,
}

const font = {
	/**
	 * The primary font.  Used in most places.
	 */
	primary: Platform.select({ ios: 'System', android: 'System' }),

	/**
	 * An alternate font used for perhaps titles and stuff.
	 */
	secondary: Platform.select({ ios: 'System', android: 'System' }),

	/**
	 * Lets get fancy with a monospace font!
	 */
	code: Platform.select({ ios: 'System', android: 'System' }),
}
export const typography: Typography = {
	/**
	 * The primary font.  Used in most places.
	 */
	primary: font.primary,

	/**
	 * An alternate font used for perhaps titles and stuff.
	 */
	secondary: font.secondary,

	/**
	 * Lets get fancy with a monospace font!
	 */
	code: font.code,

	h1: {
		fontFamily: font.primary,
		fontWeight: weight.semiBold,
		fontSize: '24px',
		lineHeight: '30px',
	},
	h2: {
		fontFamily: font.primary,
		fontWeight: weight.semiBold,
		fontSize: '16px',
		lineHeight: '26px',
	},
	h3: {
		fontFamily: font.primary,
		fontWeight: weight.regular,
		fontSize: '16px',
		lineHeight: '26px',
	},
	h4: {
		fontFamily: font.primary,
		fontWeight: weight.bold,
		fontSize: '14px',
		lineHeight: '18px',
	},
	h5: {
		fontFamily: font.primary,
		fontWeight: weight.semiBold,
		fontSize: '14px',
		lineHeight: '18px',
	},
	h6: {
		fontFamily: font.primary,
		fontWeight: weight.regular,
		fontSize: '14px',
		lineHeight: '18px',
	},
	h7: {
		fontFamily: font.primary,
		fontWeight: weight.bold,
		fontSize: '12px',
		lineHeight: '15px',
	},
	h8: {
		fontFamily: font.primary,
		fontWeight: weight.regular,
		fontSize: '12px',
		lineHeight: '15px',
	},
	body: {
		fontFamily: font.primary,
		fontWeight: weight.regular,
		fontSize: '16px',
		lineHeight: '26px',
	},
	button: {
		fontFamily: font.primary,
		fontWeight: weight.regular,
		fontSize: '16px',
		lineHeight: '26px',
	}
}
