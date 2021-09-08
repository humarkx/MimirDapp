import { ViewStyle } from 'react-native'

type Edge = 'top' | 'right' | 'bottom' | 'left'

export interface ScreenWrapperProps {
	/**
	 * Test Identifier.
	 */
	testID?: string

	/**
	 * Children components.
	 */
	children?: React.ReactNode

	/**
	 * An optional background color
	 */
	backgroundColor?: string

	/**
	 * If the screen should be all inside SafeAreaView
	 */
	safeAreaView?: boolean

	edges?: ReadonlyArray<Edge>

	/**
	 * An optional style override useful for padding & margin.
	 */
	style?: ViewStyle | ViewStyle[] | unknown
}
