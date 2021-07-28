import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ImageStyle, TextStyle, View, ViewStyle, StyleSheet } from 'react-native'
import { Button, Text, Screen, Wallpaper, AutoImage as Image, Header } from '../../components'
import socket from '../../services/sockets'
import { color, spacing } from '../../theme'

const logoMimir = require('../../../assets/images/mimir_white.png')
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

export const BetScreen = () => {
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

	const click = () => {
		console.log('CLICK')
		socket.emit('join', { id: 'b9e64f45-ba15-40b0-abdf-17e526be5a0b' })
	}

	return (
		<View testID="GameScreen" style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
				<Image source={logoMimir} style={MIMIR} />
				<Text style={TITLE} preset="header" text="Bet Placed" />

				<Image source={checked} style={CHECKED} />

				<Text style={ROUND} preset="header" text="Joining round..." />
				<Text style={PLAYERS} preset="header" text="Players" />
				<Text style={AMOUNT} preset="header" text="50.2K" />
				<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
					<View>
						<Button
							style={JOIN}
							textStyle={DEMO_TEXT}
							text="JOIN NOW"
							onPress={() => navigation.navigate('question')}
						/>
					</View>
				</View>
			</Screen>
		</View>
	)
}
