import { ViewStyle, TextStyle, TouchableOpacityProps } from 'react-native'
import { TxKeyPath } from '../../i18n'
import { TypographyVariants } from '../../theme'
import { IconSize } from '../icon/icon.props'
import { IconType } from '../icon/icons'
import { ButtonVariants, ButtonSizes, ButtonTypes } from './button.types'

export interface ButtonProps extends TouchableOpacityProps {
	/**
	 * Text which is looked up via i18n.
	 */
	tx?: TxKeyPath

	/**
	 * The text to display if not using `tx` or nested components.
	 */
	text?: string

	/**
   * button: default button behaviour.

   * ghost: the button will render without any background
   * and the background colors from variants will be used on the text.

   * link: the button is unstyled, only the color of the text will
   * be set depending on the selected variant.
   */
	type?: ButtonTypes

	/**
	 * If true, buttons takes 100% of available width.
	 */
	fitContent?: boolean

	/**
	 * If true, renders a spinner inside the button and disables the button
	 */
	loading?: boolean

	/**
	 * If the button have rounded corners.
	 */
	size?: ButtonSizes

	/**
	 * Determines how the content will be horizontally aligned.
	 * Default is center.
	 */
	align?: 'left' | 'right' | 'center' | 'space-between'

	/**
	 * An optional style override useful for padding & margin.
	 */
	style?: ViewStyle | ViewStyle[] | unknown

	/**
	 * An optional style override useful for the button text.
	 */
	textStyle?: TextStyle | TextStyle[]

	/**
	 * An optional text variant override useful for the button text.
	 */
	textVariant?: ButtonVariants

	/**
	 * One of the different variants of button.
	 */
	variant?: ButtonVariants

	/**
	 * One of the different types of text presets.
	 */
	children?: React.ReactNode

	/**
	 * Icon to be passed into Button on the left side.
	 */
	icon?: IconType

	iconSize?: IconSize
	/**
	 * The typography type to use when rendering the button.
	 */
	typography?: TypographyVariants

	opacity?: number
}
