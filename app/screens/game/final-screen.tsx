import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ImageStyle, TextStyle, View, ViewStyle, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Text, Screen, Wallpaper, Image, Header, Container, Spacer } from '../../components'
import { getUserBalance } from '../../store/user/actions'
import { colors, spacing } from '../../theme'
import { FinalScreenProps } from '../../@types'
import { RootState } from '../../store'
import { removeCurrentGame } from '../../store/games/actions'

const logoMimir = require('../../../assets/images/mimir_white.png')
const logoMimir2 = require('../../../assets/images/mimir.png')
const wallet = require('../../../assets/images/mimir_wallet.png')
const stack = require('../../../assets/images/mimir_stack.png')

const thumbsUp = require('../../../assets/images/thumbs-up-icon.png')

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
	backgroundColor: colors.transparent.transparent,
	paddingHorizontal: spacing.medium,
}
const JOIN: ViewStyle = {
	borderRadius: 50,
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
	lineHeight: 36,
	textAlign: 'center',
	marginLeft: 10,
}

export const FinalScreen = ({ navigation }: FinalScreenProps) => {
	const dispatch = useDispatch()
	const { latestPrizeWon } = useSelector((state: RootState) => state.games)

	useEffect(() => {
		dispatch(getUserBalance())
	}, [])

	const navigateToDashboard = () => {
		dispatch(removeCurrentGame())
		navigation.navigate('Dashboard')
	}

	return (
		<View testID="FinalScreen" style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} backgroundColor={colors.transparent.transparent}>
				<Image source={logoMimir} style={MIMIR} />
				{latestPrizeWon ? (
					<Container>
						<Image source={wallet} style={WALLET} />
						<Text style={CONGRATZ} preset="header" text="CONGRATULATIONS!" />
						<Text style={CONGRATZ} preset="header" text="YOU HAVE WON:" />
						<Spacer space={'medium'} />
						<Container dir={'row'} centerHorizontal centerVertical>
							<Image source={stack} style={STACK} />
							<Spacer space={'medium'} />
							<Image source={logoMimir2} style={TOKEN} />
							<Text style={AMOUNT} preset="header" text={latestPrizeWon} />
						</Container>
					</Container>
				) : (
					<Container>
						<Text style={CONGRATZ} typography={'h1'} text={'BETTER LUCK \n NEXT TIME!'} />
						<Image source={thumbsUp} style={WALLET} />
					</Container>
				)}

				<Spacer space={'larger'} />
				<Container>
					<Button style={JOIN} textStyle={DEMO_TEXT} text="CONTINUE" onPress={navigateToDashboard} />
				</Container>
			</Screen>
		</View>
	)
}
