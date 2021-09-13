import React, { useEffect, useState } from 'react'
import { ImageStyle, TextStyle, View, ViewStyle, Dimensions } from 'react-native'
import * as Progress from 'react-native-progress'
import { useSelector } from 'react-redux'
import { Text, Screen, Wallpaper, Image, Header, Question, ActivityIndicator, Spacer } from '../../components'
import socket from '../../services/sockets'
import { RootState } from '../../store'
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

export const QuestionScreen = ({ navigation }) => {
	const goBack = navigation.goBack()
	const windowWidth = Dimensions.get('window').width
	const [timer, setTimer] = useState(5)
	const [question_number, setQuestionNumber] = useState(1)
	const [question, setQuestion] = useState(null)
	const [answerResult, setAnswerResult] = useState(false)
	const { currentGame } = useSelector((state: RootState) => state.games)

	// socket.on('question', q => {
	// 	console.log('::::::::::::::::::::: question :::::::::::::::: ', q)
	// 	setAnswerResult(false)
	// 	setQuestion(q.question)
	// 	setQuestionNumber(q.index)
	// })
	socket.once('endGame', a => {
		console.log('::::::::::::::::::::: endGame :::::::::::::::: ', a)
		// navigation.navigate('final', { endGame: a })
		socket.off('endGame')
	})
	// socket.on('connect', () => {
	// 	console.log('::::::::::::::::::::: SOCKET CONNECTED :::::::::::::::: ')
	// })

	// socket.on('endGame', a => {
	// 	console.log('::::::::::::::::::::: endGame :::::::::::::::: ', a)
	// 	navigation.navigate('final', { endGame: a })
	// })

	// socket.on('results', a => {
	// 	setAnswerResult(true)
	// 	console.log('::::::::::::::::::::: RESULTS :::::::::::::::: ', a)
	// })

	// socket.on('result', a => {
	// 	console.log('::::::::::::::::::::: ANSWER RESULT :::::::::::::::: ', a)
	// })
	// socket.on('question', q => {
	// 	console.log('::::::::::::::::::::: question :::::::::::::::: ', q)
	// 	setAnswerResult(false)
	// 	setQuestion(q.question)
	// 	setQuestionNumber(q.index)
	// })

	// TODO
	// 25 seconds to respond
	// 5 seconds before next question

	// useEffect(() => {
	// 	if (question) runTimer()
	// }, [question._id])
	//
	// const runTimer = () => {
	// 	setTimeout(() => {
	// 		if (timer > 0) {
	// 			setTimer(timer - 1)
	// 		}
	// 	}, 1000)
	// }

	// useEffect(() => {
	// 	if (timer > 0) {
	// 		setTimeout(() => {
	// 			setTimer(timer - 0.1)
	// 		}, 100)
	// 	} else {
	// 		setTimeout(() => {
	// 			setTimer(5)
	// 		}, 3000)
	// 	}
	// }, [timer])

	const selectAnswer = i => {
		const answerId = question.options[i]._id
		const payload = { gameId: currentGame.refId, answerId: answerId, questionId: question._id, time: 0 }
		socket.emit('answer', payload)
	}

	if (!question)
		return (
			<View testID="GameScreen" style={FULL}>
				<Wallpaper />
				<Header leftIcon={'arrow-left2'} onLeftPress={goBack} titleStyle={HEADER_TITLE} />

				<Screen style={CONTAINER} preset="scroll" backgroundColor={colors.transparent.transparent}>
					<Text style={TITLE} text={'GET READY!!!'} />
					<Spacer space={'huge'} />
					<ActivityIndicator />
				</Screen>
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
