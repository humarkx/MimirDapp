import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ImageStyle, TextStyle, View, ViewStyle, StyleSheet, Alert, Dimensions } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as Progress from 'react-native-progress'
import { Button, Text, Screen, Wallpaper, Image as Image, Header, Question } from '../../components'
import socket from '../../services/sockets'
import { colors, spacing } from '../../theme'

const logoMimir = require('../../../assets/images/mimir_white.png')
const questionBackground = require('../../../assets/images/question_background.jpeg')
const checked = require('../../../assets/images/tick_gif.png')

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
	backgroundColor: colors.transparent.transparent,
	paddingHorizontal: spacing.medium,
}
const JOIN: ViewStyle = {
	marginTop: 20,
	borderRadius: 50,
	paddingVertical: spacing.medium,
	paddingHorizontal: spacing.medium,
	backgroundColor: '#78305F',
}
const BOLD: TextStyle = { fontWeight: 'bold' }
const DEMO_TEXT: TextStyle = {
	...BOLD,
	fontSize: 13,
	letterSpacing: 2,
}
const HEADER: TextStyle = {
	paddingTop: spacing.medium,
	paddingBottom: 0,
	paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
	...BOLD,
	fontSize: 12,
	lineHeight: 15,
	textAlign: 'center',
	letterSpacing: 1.5,
}

const TITLE: TextStyle = {
	fontSize: 28,
	lineHeight: 38,
	textAlign: 'center',
	marginTop: spacing.large,
	marginBottom: spacing.large,
}
const TAGLINE: TextStyle = {
	color: '#BAB6C8',
	fontSize: 15,
	lineHeight: 22,
	marginBottom: spacing.huge,
}
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
const QUESTION_VIEW: ViewStyle = {
	backgroundColor: '#172347',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: 62,
	padding: spacing.larger,
	marginTop: spacing.huge,
	marginBottom: spacing.massive,
}
const ANSWER_VIEW: ViewStyle = {
	backgroundColor: '#F2F2FF',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: 50,
	padding: spacing.medium,
	marginBottom: spacing.large,
}
const SELECTED_ANSWER: TextStyle = {
	...ANSWER,
	color: '#FFFFFF',
}
const SELECTED_ANSWER_VIEW: ViewStyle = {
	...ANSWER_VIEW,
	backgroundColor: 'rgb(109, 39, 84)',
}
const MIMIR: ImageStyle = {
	marginTop: spacing.massive,
	marginVertical: 0,
	alignSelf: 'center',
	width: 120,
	height: 100,
}

export const QuestionScreen = () => {
	const windowWidth = Dimensions.get('window').width
	const route = useRoute()
	const [timer, setTimer] = useState(5)
	const [question_number, setQuestionNumber] = useState(1)
	const [question, setQuestion] = useState(null)
	// const [question, setQuestion] = useState(5)
	const [answer, setAnswer] = useState(5)
	const [answerResult, setAnswerResult] = useState(false)
	const navigation = useNavigation()
	const goBack = () => navigation.goBack()

	socket.on('connect', () => {
		console.log('::::::::::::::::::::: SOCKET CONNECTED :::::::::::::::: ')
	})

	socket.on('endGame', a => {
		console.log('::::::::::::::::::::: endGame :::::::::::::::: ', a)
		navigation.navigate('final')
	})

	socket.on('question', q => {
		console.log('::::::::::::::::::::: question :::::::::::::::: ', q)
		setQuestion(q)
	})

	// if (question_number > data.length) {

	// }

	const selectAnswer = i => {
		const gameId = route.params['gameId']
		const answerId = question.options[i]._id
		const payload = { gameId, answerId: answerId, questionId: question._id, time: 0 }
		socket.emit('answer', payload)
	}

	// 1 - Sai a Question
	// 2 -user responde
	// 3 - Acaba o tempo
	// certo ou errado
	// 4 nova pergunta

	if (!question)
		return (
			<View>
				<Text>Loading</Text>
			</View>
		)
	return (
		<View testID="GameScreen" style={FULL}>
			<Wallpaper backgroundImage={questionBackground} preset="cover" />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={colors.transparent.transparent}>
				<Image source={logoMimir} style={MIMIR} />
				<Text style={TITLE} text={`Question ${question_number} of 20`} />
				<View style={{ flexDirection: 'row' }}>
					<Progress.Bar progress={timer / 5} width={windowWidth - 30} color={'#0EF3C5'} />
				</View>
				<Question data={question} onPress={selectAnswer} showResult={answerResult} />
			</Screen>
		</View>
	)
}
