import { StyleProp, ViewProps, TextStyle } from 'react-native'
import { QuestionModel } from '../../@types/question'

export interface QuestionProps extends ViewProps {
	/**
	 * Children components.
	 */
	children?: React.ReactNode
	/**
	 * Children components.
	 */
	data: QuestionModel

	/**
	 * When pressing an Answer.
	 */
	onPress: (number) => void

	/**
	 * Show answer result.
	 */
	showResult: boolean

	/**
	 * Answers.
	 */
	answers: number[]
	/**
	 * An optional style override useful for padding & margin.
	 */
	style?: StyleProp<TextStyle>
}
