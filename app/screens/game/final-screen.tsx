import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ImageStyle, TextStyle, View, ViewStyle, StyleSheet } from 'react-native'
import { Button, Text, Screen, Wallpaper, AutoImage as Image, Header } from '../../components'
import socket from '../../services/sockets'
import { color, spacing } from '../../theme'

const logoMimir = require('../../../assets/images/mimir_white.png')
const wallet = require('../../../assets/images/mimir_wallet.png')
const stack = require('../../../assets/images/mimir_stack.png')

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
	backgroundColor: '#FFFFFF',
}
const BOLD: TextStyle = { fontWeight: 'bold' }
const DEMO_TEXT: TextStyle = {
	...BOLD,
	color: '#78305F',
	fontSize: 20,
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
	marginVertical: 20,
	alignSelf: 'center',
	width: 220,
	height: 180,
}
const WALLET: ImageStyle = {
	alignSelf: 'center',
	width: 100,
	height: 100,
	marginVertical: 10
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
const CONGRATZ: TextStyle = {
	color: '#FFFFFF',

	fontSize: 15,
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

export const FinalScreen = () => {
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
				<Header leftIcon="back" onLeftPress={goBack} style={HEADER} titleStyle={HEADER_TITLE} />
				<Image source={logoMimir} style={MIMIR} />

				<Image source={wallet} style={WALLET} />

				<Text style={CONGRATZ} preset="header" text="CONGRATULATIONS!" />
				<Text style={CONGRATZ} preset="header" text="YOU HAVE WON:" />


				<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 30 }}>
					<Image source={stack} style={WALLET} />
					<Text style={AMOUNT} preset="header" text="50.2K" />
				</View>

				<Button style={JOIN} textStyle={DEMO_TEXT} text="CONTINUE" onPress={() => navigation.navigate('question')} />
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
