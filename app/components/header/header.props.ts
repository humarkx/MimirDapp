import { StyleProp, TextStyle } from 'react-native'
import { TxKeyPath } from '../../i18n'
import { IconType } from '../icon/icons'

export interface HeaderProps {
	/**
	 * Main header, e.g. POWERED BY HEYFINA
	 */
	headerTx?: TxKeyPath

	/**
	 * header non-i18n
	 */
	headerText?: string

	/**
	 * Icon that should appear on the left
	 */
	leftIcon?: IconType

	/**
	 * What happens when you press the left icon
	 */
	onLeftPress?(): void

	/**
	 * Icon that should appear on the right
	 */
	rightIcon?: IconType

	/**
	 * What happens when you press the right icon
	 */
	onRightPress?(): void

	/**
	 * Title style overrides.
	 */
	titleStyle?: StyleProp<TextStyle>

	/**
	 * Title style overrides.
	 */
	isAbsolute?: boolean
}
