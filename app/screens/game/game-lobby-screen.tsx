import React, { useEffect } from 'react'
import dayjs from 'dayjs'
import { Animated, ImageStyle, TextStyle, View, ViewStyle } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import { useSelector } from 'react-redux'
import { GameLobbyScreenProps } from '../../@types'
import { GameStatus, GameType } from '../../@types/games'
import { ActivityIndicator, Container, Header, Image, Screen, Spacer, Text, Wallpaper } from '../../components'
import { getRemainingTimeUntilMsTimestamp } from '../../components/countdown-timer/countdown-timer-utils'
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

const BOLD: TextStyle = { fontWeight: 'bold' }

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

export const GameLobbyScreen = ({ navigation }: GameLobbyScreenProps) => {
	const { currentGame } = useSelector((state: RootState) => state.games)
	if (!currentGame) return <ActivityIndicator />

	useEffect(() => {
		socket.emit('join', { id: currentGame.refId })
		console.log('join game:::', currentGame.refId)
	}, [])

	const goBack = () => {
		socket.emit('leave', { id: currentGame.refId })
		console.log('left game:::', currentGame.refId)
		navigation.goBack()
	}

	useEffect(() => {
		console.log('RE-RENDERING......')
	}, [])

	useEffect(() => {
		if (currentGame.status === GameStatus.STARTING && dayjs(currentGame.startDate).diff(dayjs()) < -10) {
			navigation.navigate('Dashboard')
		}
	}, [])

	return (
		<View testID="GameLobbyScreen" style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={colors.transparent.transparent}>
				<Header leftIcon={'arrow-left2'} onLeftPress={goBack} titleStyle={HEADER_TITLE} />
				<Image source={logoMimir} style={MIMIR} />
				{/*<Text style={PLAYERS} preset="header" text="Players" />*/}
				{currentGame.type === GameType.BET && <Text style={TITLE} preset="header" text="Bet Placed" />}
				<Spacer space={'medium'} />
				<Image source={checked} style={CHECKED} />
				<Spacer space={'medium'} />
				{currentGame.status !== GameStatus.STARTING && (
					<Container>
						<Text style={ROUND} preset="header" text="Waiting for players" />
						<Spacer space={'medium'} />
						<ActivityIndicator />
					</Container>
				)}

				<Spacer space={'medium'} />
				{currentGame.status === GameStatus.STARTING && (
					<Container centerVertical centerHorizontal>
						<Text style={PLAYERS} preset="header" text="Game starting in" />
						<Spacer space={'medium'} />
						<CountdownCircleTimer
							size={120}
							isPlaying
							duration={getRemainingTimeUntilMsTimestamp(currentGame.startDate).totalSeconds}
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
