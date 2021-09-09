import { ViewStyle, ViewProps, StyleProp } from 'react-native'

export interface CardProps extends ViewProps {
	/**
	 * Children components.
	 */
	children?: React.ReactNode

	/**
	 * Text which is looked up via i18n.
	 */
	tx?: string

	/**
	 * Optional options to pass to i18n. Useful for interpolation
	 * as well as explicitly setting locale or translation fallbacks.
	 */
	txOptions?: Record<string, unknown>

	/**
	 * The text to display if not using `tx` or nested components.
	 */
	text?: string

	/**
	 * Color which is to override variants.
	 */
	color?: string

	/**
	 * An optional style override useful for padding & margin.
	 */
	style?: StyleProp<ViewStyle>
}
