import React, { useState, useEffect } from 'react'
import { ImageStyle, TextStyle, View, ViewStyle, StyleSheet, Alert } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { translate } from '../../i18n'
import { colors, spacing } from '../../theme'
import { Container } from '../container/container'
import { Text } from '../text/text'
import { QuestionProps } from './question.props'

const QUESTION: TextStyle = {
	color: '#FFFFFF',
	fontSize: 22,
	fontWeight: '400',
	textAlign: 'center',
	lineHeight: 22,
}
const ANSWER: TextStyle = {
	color: 'rgb(109, 39, 84)',
	fontWeight: '400',
	fontSize: 20,
	lineHeight: 22,
}
const RESULT: TextStyle = {
	color: '#ffffff',
	fontWeight: '600',
	fontSize: 22,
	lineHeight: 22,
}

const QUESTION_VIEW: ViewStyle = {
	backgroundColor: '#172347',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: 62,
	padding: spacing.larger,
	marginTop: spacing.huge,
}
const ANSWER_VIEW: ViewStyle = {
	flexDirection: 'row',
	backgroundColor: '#F2F2FF',
	justifyContent: 'space-around',
	alignItems: 'center',
	borderRadius: 50,
	padding: spacing.medium,
	marginBottom: spacing.large,
}
const SELECTED_ANSWER: TextStyle = {
	...ANSWER,
	color: '#FFFFFF',
}

const CORRECT_ANSWER: ViewStyle = {
	...ANSWER_VIEW,
	backgroundColor: '#04E2B7',
}
const WRONG_ANSWER: ViewStyle = {
	...ANSWER_VIEW,
	backgroundColor: '#6D2754',
}
const SELECTED_ANSWER_VIEW: ViewStyle = {
	...ANSWER_VIEW,
	backgroundColor: '#038298',
}

export function Question({ data, onPress, showResult, totalPlayers }: QuestionProps) {
	const [answerResult, setAnswerResult] = useState(null)
	const [answer, setAnswer] = useState(null)

	useEffect(() => {
		if (showResult) {
			setAnswerResult(answer != null && data.options[answer].correct ? 'Correct' : 'Wrong')
		}
	}, [showResult, answer])

	useEffect(() => {
		setAnswerResult(null)
		setAnswer(null)
	}, [data?._id])

	const selectAnswer = i => {
		if (answer || answer === 0) return
		setAnswer(i)
		onPress(i)
	}

	const renderOptions = () => {
		return data.options.map((option, i) => (
			<TouchableWithoutFeedback key={i} onPress={() => selectAnswer(i)} disabled={showResult || answer}>
				<View
					style={
						answer === i
							? !showResult
								? SELECTED_ANSWER_VIEW
								: option.correct
								? CORRECT_ANSWER
								: WRONG_ANSWER
							: !showResult
							? ANSWER_VIEW
							: option.correct
							? CORRECT_ANSWER
							: ANSWER_VIEW
					}>
					{answer === i && (
						<Text
							style={[answer === i ? SELECTED_ANSWER : ANSWER, { position: 'absolute', left: 30, fontSize: 12 }]}
							text={'Your answer'}
						/>
					)}
					<Text style={answer === i ? SELECTED_ANSWER : ANSWER} text={option.text} />
					{/*{showResult && (*/}
					{/*	<Text*/}
					{/*		style={[answer === i ? SELECTED_ANSWER : ANSWER, { position: 'absolute', right: 30 }]}*/}
					{/*		text={Math.floor(totalAnswers * option.answers * 0.01) + 'K'}*/}
					{/*	/>*/}
					{/*)}*/}
				</View>
			</TouchableWithoutFeedback>
		))
	}

	return (
		<>
			<View style={QUESTION_VIEW}>
				<Text style={QUESTION} text={data.text} />
			</View>
			<Container hasFlex={false} centerHorizontal centerVertical style={{ minHeight: 60 }}>
				{showResult && answerResult === 'Correct' && (
					<Text variant={'secondary'} typography={'h1'} text={`${answerResult}!`} />
				)}
				{showResult && answerResult === 'Wrong' && (
					<Text variant={'primary'} typography={'h1'} text={`${answerResult}!`} />
				)}
			</Container>
			{renderOptions()}
		</>
	)
}
