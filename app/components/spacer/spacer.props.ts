import { Spacing } from '../../theme'

export type Spacings = keyof Spacing


export interface SpacerProps {
	/**
	 * Text which is looked up via i18n.
	 */
	space?: Spacings
}

