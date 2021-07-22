import { rgba } from 'polished'
import { Palette, palette } from './palette'

/**
 * Roles for colors.  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 *
 * REACT NAVIGATION:
 * 	dark (boolean): Whether this is a dark theme or a light theme
 * 	colors (object): Various colors used by react navigation components:
 * 		primary (string): The primary color of the app used to tint various elements. Usually you'll want to use your brand color for this.
 * 		background (string): The color of various backgrounds, such as background color for the screens.
 * 		card (string): The background color of card-like elements, such as headers, tab bars etc.
 *		text (string): The text color of various elements.
 *		border (string): The color of borders, e.g. header border, tab bar border etc.
 *		notification (string): The color of Tab Navigator badge.
 */

export interface Colors {
	primary: string // REACT NAVIGATION
	secondary: string
	background: string // REACT NAVIGATION
	lightBackground: string
	backgroundOpacity: string
	backgroundDarkOpacity: string
	card: string // REACT NAVIGATION
	cardTint: string
	text: string // REACT NAVIGATION
	textLight: string
	buttonDefault: string
	border: string // REACT NAVIGATION
	lightBorder: string
	interface: {
		info: string
		warning: string
		error: string
		success: string
	}
	social: {
		facebook: string
		instagram: string
		youtube: string
		twitter: string
	}
	transparent: {
		transparent: string
		ghost: string
		faded: string
	}
	palette: Palette
}
export const colors = {
	/**
	 * The main app color.
	 */
	primary: palette.primary,

	/**
	 * Auxiliary color.
	 */
	secondary: palette.secondary,

	/**
	 * Main Background Color.
	 */
	background: palette.light,

	/**
	 * Auxiliary lighter background Color.
	 */
	lightBackground: palette.white,

	/**
	 * Dark background with opacity.
	 * Used for backdrops.
	 */
	backgroundOpacity: rgba(palette.trueBlack, 0.5),

	/**
	 * Dark background with low opacity.
	 * Used for selectors and overlays.
	 */
	backgroundDarkOpacity: rgba(palette.trueBlack, 0.8),

	card: palette.gray,
	cardTint: palette.gray,

	/**
	 * The default color of text in many components.
	 */
	text: palette.trueBlack,

	/**
	 * Used for light text.
	 */
	textLight: palette.gray,

	/**
	 * Used as default for border/background of buttons.
	 */
	buttonDefault: palette.secondary,

	/**
	 * A subtle color used for borders and lines.
	 */
	border: palette.primary,
	lightBorder: palette.lightPurple,

	interface: {
		/**
		 * Error messages and icons.
		 */
		info: palette.interface.info,
		/**
		 * Warning messages.
		 */
		warning: palette.interface.warning,
		/**
		 * Error messages.
		 */
		error: palette.interface.error,
		/**
		 * Success messages.
		 */
		success: palette.interface.success,
	},

	social: {
		facebook: palette.social.facebook,
		instagram: palette.social.instagram,
		youtube: palette.social.youtube,
		twitter: palette.social.twitter,
	},

	// TODO check this in February 2021
	/**
	 * A helper for making something see-thru. Use sparingly as many layers of transparency
	 * can cause older Android devices to slow down due to the excessive compositing required
	 * by their under-powered GPUs.
	 */
	transparent: {
		transparent: rgba(0, 0, 0, 0),
		ghost: rgba(0, 0, 0, 0.05),
		faded: rgba(0, 0, 0, 0.5),
	},
	/**
	 * The palette is available to use, but prefer using the name.
	 */
	palette,
}
