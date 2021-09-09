import { ViewStyle } from 'react-native'
import { colors } from '../../theme'
/**
 * All screen keyboard offsets.
 */
export const offsets = {
	none: 0,
}

/**
 * The variations of keyboard offsets.
 */
export type KeyboardOffsets = keyof typeof offsets

/**
 * All the variations of screens.
 */
export const presets = {
	/**
	 * No scrolling. Suitable for full-screen carousels and components
	 * which have built-in scrolling like FlatList.
	 */
	fixed: {
		outer: {
			backgroundColor: colors.transparent.transparent,
			flex: 1,
			height: '100%',
		} as ViewStyle,
		inner: {
			justifyContent: 'flex-start',
			alignItems: 'stretch',
			height: '100%',
			width: '100%',
		} as ViewStyle,
	},

	/**
	 * Scrolls. Suitable for forms or other things requiring a keyboard.
	 *
	 * Pick this one if you don't know which one you want yet.
	 */
	scroll: {
		outer: {
			backgroundColor: colors.transparent.transparent,
			flex: 1,
			height: '100%',
		} as ViewStyle,
		inner: { justifyContent: 'flex-start', alignItems: 'stretch' } as ViewStyle,
	},

	/**
	 * Scrolls. Suitable for forms or other things requiring a keyboard.
	 *
	 * Pick this one if you don't know which one you want yet.
	 */
	keyboardScroll: {
		outer: {
			backgroundColor: colors.transparent.transparent,
			flex: 1,
			height: '100%',
		} as ViewStyle,
		inner: {
			justifyContent: 'flex-start',
			alignItems: 'stretch',
			height: '100%',
			width: '100%',
		} as ViewStyle,
	},
}

/**
 * The variations of screens.
 */
export type ScreenPresets = keyof typeof presets
