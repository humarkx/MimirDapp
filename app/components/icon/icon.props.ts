import { ViewStyle, TextStyle } from 'react-native'
import { IconType } from './icons'

export interface IconProps {
	/**
	 * Style overrides for the icon image
	 */
	style?: TextStyle

	/**
	 * Style overrides for the icon container
	 */
	containerStyle?: ViewStyle

	/**
	 * Icon size, if not set, the default size of the image will be applied
	 * - xs: 16px
	 * - small: 20px
	 * - medium: 24px (default)
	 * - large: 32px
	 * - xl: 48px
	 * - number: ${number}px
	 */
	size?: IconSize

	/**
	 * Icon color
	 * Default is white
	 */
	color?: string

	/**
	 * The name of the icon
	 */
	name?: IconType

	/**
	 * Set to true to use the new Wasder font
	 */
	v2?: boolean
}

export type IconSize = 'xs' | 'small' | 'medium' | 'large' | 'xl' | number
