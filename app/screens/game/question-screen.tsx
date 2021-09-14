import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ImageStyle, TextStyle, View, ViewStyle, StyleSheet, Alert, Dimensions } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import * as Progress from 'react-native-progress'
import {
	Button,
	Text,
	Screen,
	Wallpaper,
	Image,
	Header,
	Question,
	ActivityIndicator,
	Spacer,
	ScreenWrapper,
} from '../../components'
import socket from '../../services/sockets'
import { colors, spacing } from '../../theme'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import dayjs from 'dayjs'
import { getRemainingTimeUntilMsTimestamp } from '../../components/countdown-timer/countdown-timer-utils'

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
const PLAYERS: TextStyle = {
	color: '#0EF3C5',
	fontWeight: '500',
	fontSize: 18,
	lineHeight: 30,
	textAlign: 'center',
}
const AMOUNT: TextStyle = {
	fontSize: 18,
	textAlign: 'center',
	fontWeight: '400',
}

export const QuestionScreen = ({ navigation }) => {
	const windowWidth = Dimensions.get('window').width
	const { currentGame, currentQuestion } = useSelector((state: RootState) => state.games)
	const [timer, setTimer] = useState(100)
	const selectAnswer = i => {
		const answerId = currentQuestion.question.options[i]._id
		const payload = { gameId: currentGame.refId, answerId: answerId, questionId: currentQuestion.question._id, time: 0 }
		socket.emit('answer', payload)
	}

	useEffect(() => {
		console.log('RE-RENDERING:::::')
		const timer1 = setTimeout(() => {
			setTimer(timer - 1.3)
		}, 100)

		// this will clear Timeout
		// when component unmount like in willComponentUnmount
		// and show will not change to true
		return () => {
			clearTimeout(timer1)
		}
	}, [timer])

	useEffect(() => {
		if (currentQuestion.question) {
			setTimer(100)
		}
	}, [currentQuestion?.question?._id])

	if (!currentQuestion.question)
		return (
			<View testID="GameScreen" style={FULL}>
				<Wallpaper />
				{/*<Header leftIcon={'arrow-left'} onLeftPress={navigation.goBack} />*/}
				<Screen style={CONTAINER} preset="scroll" backgroundColor={colors.transparent.transparent}>
					<Text style={TITLE} text={'GET READY!!!'} />
					<Spacer space={'huge'} />
					<ActivityIndicator />
				</Screen>
			</View>
		)
	return (
		<ScreenWrapper testID="GameScreen" style={FULL} safeAreaView>
			<Wallpaper backgroundImage={questionBackground} preset="cover" />
			<Screen style={CONTAINER} backgroundColor={colors.transparent.transparent} unsafe>
				<View style={{ position: 'absolute', right: 30 }}>
					<Text style={PLAYERS} preset="header" text="Players" />
					<Text style={AMOUNT} preset="header" text={currentQuestion.totalPlayers} />
				</View>
				<Header leftIcon={'arrow-left'} onLeftPress={navigation.goBack} />
				<Image source={logoMimir} style={MIMIR} />
				<Text style={TITLE} text={`Question ${currentQuestion.index} of 20`} />
				<View style={{ flexDirection: 'row', minHeight: 8 }}>
					{!currentQuestion.showResult && (
						<Progress.Bar progress={timer / 100} width={windowWidth - 30} color={'#0EF3C5'} />
					)}
				</View>
				<Question
					data={currentQuestion.question}
					answers={currentQuestion.answers}
					onPress={selectAnswer}
					showResult={currentQuestion.showResult}
				/>
			</Screen>
		</ScreenWrapper>
	)
}
