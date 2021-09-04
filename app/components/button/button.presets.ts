import { ViewStyle, TextStyle } from 'react-native'
import { colors, spacing } from '../../theme'

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
	paddingVertical: spacing.small,
	paddingHorizontal: spacing.small,
	borderRadius: 50,
	justifyContent: 'center',
	alignItems: 'center',
}

const BASE_TEXT: TextStyle = {
	paddingHorizontal: spacing.small,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets: Record<string, ViewStyle> = {
	/**
	 * A smaller piece of secondard information.
	 */
	primary: { ...BASE_VIEW, backgroundColor: colors.palette.orange } as ViewStyle,

	/**
	 * A button without extras.
	 */
	link: {
		...BASE_VIEW,
		paddingHorizontal: 0,
		paddingVertical: 0,
		alignItems: 'flex-start',
	} as ViewStyle,
}

export const textPresets: Record<ButtonPresetNames, TextStyle> = {
	primary: { ...BASE_TEXT, fontSize: 9, color: colors.palette.white } as TextStyle,
	link: {
		...BASE_TEXT,
		color: colors.text,
		paddingHorizontal: 0,
		paddingVertical: 0,
	} as TextStyle,
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets
