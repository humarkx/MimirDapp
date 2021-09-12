import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ImageStyle, TextStyle, View, ViewStyle, StyleSheet } from 'react-native'
import { Button, Text, Screen, Wallpaper, Image as Image, Header, ActivityIndicator } from '../../components'
import socket from '../../services/sockets'
import { colors, spacing } from '../../theme'
import { GameLobbyScreenProps } from '../../@types'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { GameType } from '../../@types/games'

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
	marginBottom: spacing.large,
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
	const route = useRoute()
	const goBack = () => navigation.goBack()
	const { currentGame } = useSelector((state: RootState) => state.games)
	const [isPaid, setIsPaid] = useState<boolean>(false)
	const [isStarting, setIsStarting] = useState<boolean>(false)

	if (!currentGame) return <ActivityIndicator />

	useEffect(() => {
		if (currentGame) setIsPaid(currentGame.type === GameType.BET)
	}, [currentGame._id])

	useEffect(() => {
		if (currentGame) {
			console.log('CURRENT GAME:::::', currentGame)
			// currentGame.players
			setIsStarting(true)
		}
	}, [currentGame.status])

	const [loading, setLoading] = useState(false)
	socket.on('connect', () => {
		console.log('::::::::::::::::::::: SOCKET CONNECTED :::::::::::::::: ')
	})

	socket.on('startGame', a => {
		navigation.navigate('question', { gameId: route.params['gameId'] })
		console.log('::::::::::::::::::::: startGame :::::::::::::::: ', a)
	})

	socket.on('question', q => {
		console.log('::::::::::::::::::::: question :::::::::::::::: ', q)
	})

	console.log('connect', socket.connected)

	const click = () => {
		setLoading(true)
		console.log('CLICK', currentGame.refId)

		socket.emit('join', { id: currentGame.refId })
	}

	return (
		<View testID="GameLobbyScreen" style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={colors.transparent.transparent}>
				<Header leftIcon={'arrow-left2'} onLeftPress={goBack} titleStyle={HEADER_TITLE} />
				<Image source={logoMimir} style={MIMIR} />
				{isPaid && <Text style={TITLE} preset="header" text="Bet Placed" />}

				<Image source={checked} style={CHECKED} />

				{loading && <Text style={ROUND} preset="header" text="Joining round..." />}
				<Text style={PLAYERS} preset="header" text="Players" />
				<Text style={AMOUNT} preset="header" text="50.2K" />
				{loading && <ActivityIndicator />}
				<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
					<View>
						<Button style={JOIN} textStyle={DEMO_TEXT} text="JOIN NOW" onPress={() => click()} disabled={loading} />
					</View>
				</View>
			</Screen>
		</View>
	)
}