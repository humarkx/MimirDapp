import { StyleProp, ViewProps, ViewStyle } from 'react-native'

export interface ContainerProps extends ViewProps {
	/**
	 * Children components.
	 */
	children?: React.ReactNode

	/**
	 * An optional background color
	 */
	backgroundColor?: string

	/**
	 * An optional background color
	 */
	center?: boolean

	/**
	 * An optional direction
	 */
	direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse'

	/**
	 * An optional no flex option
	 */
	hasFlex?: boolean

	/**
	 * An optional paddingLeft
	 */
	paddingLeft?: number

	/**
	 * An optional paddingRight
	 */
	paddingRight?: number

	/**
	 * An optional marginLeft
	 */
	marginLeft?: number

	/**
	 * An optional marginRight
	 */
	marginRight?: number

	/**
	 * Container style overrides.
	 */
	style?: StyleProp<ViewStyle>
}
