import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { ImageStyle, TextStyle, View, ViewStyle, Animated } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useSelector } from 'react-redux'
import { GameLobbyScreenProps } from '../../@types'
import { GameType } from '../../@types/games'
import { Button, Text, Screen, Wallpaper, Image, Header, ActivityIndicator, Spacer, Container } from '../../components'
import socket from '../../services/sockets'
import { RootState } from '../../store'
import { colors, spacing } from '../../theme'

const logoMimir = require('../../../assets/images/mimir_white.png')
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
	paddingBottom: spacing.large,
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
	...BOLD,
	fontSize: 34,
	lineHeight: 38,
	textAlign: 'center',
}
const TAGLINE: TextStyle = {
	color: '#BAB6C8',
	fontSize: 15,
	lineHeight: 22,
	marginBottom: spacing.huge,
}
const MIMIR: ImageStyle = {
	marginTop: spacing.massive,
	marginVertical: 20,
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

export const GameLobbyScreen = ({ navigation }: GameLobbyScreenProps) => {
	const goBack = () => navigation.goBack()
	const { currentGame } = useSelector((state: RootState) => state.games)
	const [isPaid, setIsPaid] = useState<boolean>(false)
	const [isStarting, setIsStarting] = useState<boolean>(false)
	const [seconds, setSeconds] = useState(60)
	if (!currentGame) return <ActivityIndicator />

	useEffect(() => {
		socket.emit('join', { id: currentGame.refId })
		console.log('JOINED:::', currentGame.refId)
		return () => {
			socket.emit('leave', { id: currentGame.refId })
			console.log('LEFT:::', currentGame.refId)
		}
	}, [])

	useEffect(() => {
		console.log('RE-RENDERING......')
	}, [])
	useEffect(() => {
		if (currentGame) setIsPaid(currentGame.type === GameType.BET)
	}, [currentGame._id])

	socket.on('starting', () => {
		setIsStarting(true)
	})

	socket.on('startGame', a => {
		navigation.navigate('question')
	})

	useEffect(() => {
		if (isStarting) {
			const date2 = dayjs('2018-06-05')
		}
	})

	return (
		<View testID="GameLobbyScreen" style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={colors.transparent.transparent}>
				<Header leftIcon={'arrow-left2'} onLeftPress={goBack} titleStyle={HEADER_TITLE} />
				<Image source={logoMimir} style={MIMIR} />
				{/*<Text style={PLAYERS} preset="header" text="Players" />*/}

				{isPaid && <Text style={TITLE} preset="header" text="Bet Placed" />}

				<Spacer space={'medium'} />

				<Image source={checked} style={CHECKED} />
				<Spacer space={'medium'} />
				{!isStarting && (
					<Container>
						<Text style={ROUND} preset="header" text="Waiting for players" />
						<Spacer space={'medium'} />
						<ActivityIndicator />
					</Container>
				)}

				<Spacer space={'medium'} />
				{isStarting && (
					<Container centerVertical centerHorizontal>
						<Text style={PLAYERS} preset="header" text="Game starting in" />
						<Spacer space={'medium'} />
						<CountdownCircleTimer
							size={120}
							isPlaying
							duration={60}
							colors={[
								['#038298', 0.4],
								['#039875', 0.4],
								['#0EF3C5', 0.2],
							]}>
							{({ remainingTime, animatedColor }) => (
								<Animated.Text style={{ color: animatedColor }}>{remainingTime}</Animated.Text>
							)}
						</CountdownCircleTimer>
					</Container>
				)}
			</Screen>
		</View>
	)
}
