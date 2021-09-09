import i18n from 'i18n-js'
import { TextStyle, TextProps as TextProperties } from 'react-native'
import { TxKeyPath } from '../../i18n'
import { TypographyVariants } from '../../theme'
import { TextColorVariants } from './text.types'

export interface TextProps extends TextProperties {
	/**
	 * Children components.
	 */
	children?: React.ReactNode

	/**
	 * Text which is looked up via i18n.
	 */
	tx?: TxKeyPath

	/**
	 * Optional options to pass to i18n. Useful for interpolation
	 * as well as explicitly setting locale or translation fallbacks.
	 */
	txOptions?: i18n.TranslateOptions

	/**
	 * The text to display if not using `tx` or nested components.
	 */
	text?: string | number

	/**
	 * The text to display if not using `tx` or nested components.
	 */
	align?: 'auto' | 'left' | 'right' | 'center' | 'justify'

	/**
	 * Color which is to override variants.
	 */
	color?: string

	/**
	 * An optional style override useful for padding & margin.
	 */
	style?: TextStyle | TextStyle[]

	/**
	 * One of the different variants of text colors.
	 */
	variant?: TextColorVariants

	/**
	 * One of the different variants of text typography.
	 */
	typography?: TypographyVariants

	textShadow?: string
}
