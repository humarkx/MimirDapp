import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ImageStyle, TextStyle, View, ViewStyle, StyleSheet } from 'react-native'
import { Button, Text, Screen, Wallpaper, Image as Image, Header } from '../../components'
import socket from '../../services/sockets'
import { colors, spacing } from '../../theme'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { getCurrentUser } from '../../store/user/actions'

const logoMimir = require('../../../assets/images/mimir_white.png')
const logoMimir2 = require('../../../assets/images/mimir.png')
const wallet = require('../../../assets/images/mimir_wallet.png')
const stack = require('../../../assets/images/mimir_stack.png')

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
	marginHorizontal: 30,
	backgroundColor: '#FFFFFF',
}
const BOLD: TextStyle = { fontWeight: 'bold' }
const DEMO_TEXT: TextStyle = {
	...BOLD,
	color: '#78305F',
	fontSize: 25,
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
	marginVertical: 10,
}
const STACK: ImageStyle = {
	alignSelf: 'center',
	width: 100,
	height: 100,
}
const TOKEN: ImageStyle = {
	alignSelf: 'center',
	width: 20,
	height: 30,
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
	textAlign: 'center',
	marginLeft: 10,
}

export const FinalScreen = () => {
	const [prize, setPrize] = useState('')
	const navigation = useNavigation()
	const goBack = () => navigation.goBack()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getCurrentUser())
		setPrize(Math.floor(Math.random() * 10000).toString())
	}, [])

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

	const updateWalletBallance = async () => {
		try {
			const currentBalance = await AsyncStorage.getItem('balance')
			const newWalletBallance = Number(currentBalance) + Number(prize)
			await AsyncStorage.setItem('balance', newWalletBallance.toString())
		} catch (e) {
			console.log(e)
		}
	}
	const navigateToDashboard = async () => {
		await updateWalletBallance()
		navigation.navigate('Dashboard')
	}

	return (
		<View testID="GameScreen" style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={colors.transparent.transparent}>
				<Image source={logoMimir} style={MIMIR} />

				<Image source={wallet} style={WALLET} />

				<Text style={CONGRATZ} preset="header" text="CONGRATULATIONS!" />
				<Text style={CONGRATZ} preset="header" text="YOU HAVE WON:" />

				<View
					style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', marginVertical: 30 }}>
					<Image source={stack} style={STACK} />
					<View style={{ flexDirection: 'row' }}>
						<Image source={logoMimir2} style={TOKEN} />
						<Text style={AMOUNT} preset="header" text={prize} />
					</View>
				</View>

				<Button style={JOIN} textStyle={DEMO_TEXT} text="CONTINUE" onPress={navigateToDashboard} />
			</Screen>
		</View>
	)
}
