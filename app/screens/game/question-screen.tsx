import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ImageStyle, TextStyle, View, ViewStyle, StyleSheet, Alert, Dimensions } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as Progress from 'react-native-progress'
import { Button, Text, Screen, Wallpaper, AutoImage as Image, Header, Question } from '../../components'
import socket from '../../services/sockets'
import { color, spacing } from '../../theme'

const logoMimir = require('../../../assets/images/mimir_white.png')
const questionBackground = require('../../../assets/images/question_background.jpeg')
const checked = require('../../../assets/images/tick_gif.png')

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
	backgroundColor: color.transparent,
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
	marginVertical: 0,
	alignSelf: 'center',
	width: 120,
	height: 100,
}

export const QuestionScreen = () => {
	const windowWidth = Dimensions.get('window').width
	const [timer, setTimer] = useState(5)
	const [question_number, setQuestionNumber] = useState(1)
	const [question, setQuestion] = useState(null)
	// const [question, setQuestion] = useState(5)
	const [answer, setAnswer] = useState(5)
	const [answerResult, setAnswerResult] = useState(false)
	const navigation = useNavigation()
	const goBack = () => navigation.goBack()

	useEffect(() => {
		if (data) {
			setQuestion(data[0])
			setTimeout(() => {
				setTimer(timer - 1)
			}, 1000)
		}
	}, [])

	useEffect(() => {
		setQuestion(data[question_number - 1])
	}, [question_number])

	useEffect(() => {
		if (timer > 0) {
			setTimeout(() => {
				setTimer(timer - 0.1)
			}, 100)
		} else {
			setTimeout(() => {
				setAnswerResult(true)
			}, 500)
			setTimeout(() => {
				setAnswerResult(false)
				setTimer(5)
				setQuestionNumber(question_number + 1)
			}, 3000)
		}
	}, [timer])
	// useEffect(() => {
	// 	setQuestion(data[i])
	// }, [question_number])

	const data = [
		{
			question: 'How many potatos does a potato have?',
			options: [
				{
					value: '4',
					correct: false,
					answers: 5,
				},
				{
					value: '7',
					correct: true,
					answers: 3,
				},
				{
					value: '33',
					correct: false,
					answers: 2,
				},
			],
			answers: 10,
		},

		{
			question: 'How many apples does an apple have?',
			options: [
				{
					value: '1',
					correct: false,
					answers: 2,
				},
				{
					value: '2',
					correct: false,
					answers: 5,
				},
				{
					value: '3',
					correct: true,
					answers: 3,
				},
			],
			answers: 10,
		},

		{
			question: 'How many bananas does a banana have?',
			options: [
				{
					value: '4',
					correct: false,
					answers: 5,
				},
				{
					value: '7',
					correct: true,
					answers: 5,
				},
				{
					value: '33',
					correct: false,
					answers: 0,
				},
			],
			answers: 10,
		},
	]

	socket.on('connect', () => {
		console.log('::::::::::::::::::::: SOCKET CONNECTED :::::::::::::::: ')
	})

	socket.on('RoomEnter', a => {
		console.log('::::::::::::::::::::: RoomEnter :::::::::::::::: ', a)
	})

	socket.on('question', q => {
		console.log('::::::::::::::::::::: question :::::::::::::::: ', q)
	})

	if (question_number > data.length) {
		navigation.navigate('final')
	}

	const selectAnswer = i => {
		// do something later
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
			<Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
				<Image source={logoMimir} style={MIMIR} />
				<Text style={TITLE} preset="header" text={`Question ${question_number} of ${data.length}`} />
				<View style={{ flexDirection: 'row' }}>
					<Progress.Bar progress={timer / 5} width={windowWidth - 30} color={'#0EF3C5'} />
				</View>
				<Question data={question} onPress={selectAnswer} showResult={answerResult} />
			</Screen>
		</View>
	)
}
