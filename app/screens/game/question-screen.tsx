import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ImageStyle, TextStyle, View, ViewStyle, StyleSheet, Alert } from 'react-native';
import { Button, Text, Screen, Wallpaper, AutoImage as Image, Header } from '../../components'
import socket from '../../services/sockets'
import { color, spacing } from '../../theme'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const logoMimir = require('../../../assets/images/mimir_white.png')
const checked = require('../../../assets/images/tick_gif.png')
const champions = require('../../../assets/images/champions-leage.jpeg')

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
	fontWeight: "400",
	textAlign: 'center',
	lineHeight: 22,
}
const ANSWER: TextStyle = {
	color: "rgb(109, 39, 84)",
	fontWeight: "400",
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
	backgroundColor: "rgb(109, 39, 84)",
}
const MIMIR: ImageStyle = {
	marginVertical: 0,
	alignSelf: 'center',
	width: 120,
	height: 100,
}
const CHECKED: ImageStyle = {
	alignSelf: 'center',
	width: 100,
	height: 100,
}
const LOVE_WRAPPER: ViewStyle = {
	flexDirection: 'row',
	alignItems: 'center',
	alignSelf: 'center',
}
const LOVE: TextStyle = {
	color: '#BAB6C8',
	fontSize: 15,
	lineHeight: 22,
}

const ROUND: TextStyle = {
	fontWeight: '100',
	fontSize: 20,
	lineHeight: 38,
	textAlign: 'center',
	marginBottom: 20,
	marginTop: 10,
}
const PLAYERS: TextStyle = {
	color: '#0EF3C5',
	fontWeight: '100',
	fontSize: 20,
	lineHeight: 38,
	textAlign: 'center',
}
const AMOUNT: TextStyle = {
	...BOLD,
	fontSize: 34,
	lineHeight: 38,
	textAlign: 'center',
	marginBottom: spacing.large,
}

export const QuestionScreen = () => {
	const [answer, setAnswer] = useState(5)
	const navigation = useNavigation()
	const goBack = () => navigation.goBack()

	socket.on('connect', () => {
		console.log('::::::::::::::::::::: SOCKET CONNECTED :::::::::::::::: ')
	})

	socket.on('RoomEnter', a => {
		console.log('::::::::::::::::::::: RoomEnter :::::::::::::::: ', a)
	})

	socket.on('question', q => {
		console.log('::::::::::::::::::::: question :::::::::::::::: ', q)
	})
	console.log('connect')

	return (
		<View testID="GameScreen" style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={color.palette.lightGreen}>
				<Header leftIcon="back" onLeftPress={goBack} style={HEADER} titleStyle={HEADER_TITLE} />
				<Image source={logoMimir} style={MIMIR} />
				<Text style={TITLE} preset="header" text="QUESTION 1 OF 3" />

				<View style={QUESTION_VIEW}>
					<Text style={QUESTION} text="How many potatos does a potato have?" />
				</View>
				<View style={ANSWER_VIEW}>
					<Text style={ANSWER} text="2" />
				</View>
				<View style={answer == 2 ? SELECTED_ANSWER_VIEW : ANSWER_VIEW}>
					<TouchableWithoutFeedback onPress={() => setAnswer(2)}>
						<Text style={answer == 2 ? SELECTED_ANSWER : ANSWER} text="5" />
					</TouchableWithoutFeedback>
				</View>
				<View style={ANSWER_VIEW}>
					<Text style={ANSWER} text="25" />
				</View>
			</Screen>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: '#152d44',
		flex: 1,
		justifyContent: 'space-between',
		padding: 50,
	},
	points: {
		color: '#ffffff',
		fontSize: 25,
		fontWeight: '500',
		letterSpacing: 1.5,
		textAlign: 'center',
	},
	pointsDelta: {
		color: '#4c6479',
		fontSize: 50,
		fontWeight: '100',
	},
	pointsDeltaActive: {
		color: '#fff',
	},
	actionLabel: {
		color: '#ffffff',
		fontSize: 20,
		fontWeight: '500',
		marginBottom: 30,
		marginTop: 30,
		textAlign: 'center',
	},
})
