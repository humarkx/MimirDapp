import React from 'react'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from 'react-native'
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image } from '../../components'
import { color, spacing, typography } from '../../theme'

const MimirLogo = require('./MimirWhiteStanding.png')
const BlockchainLogo = require('./blockchain.png')


const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
	backgroundColor: color.transparent,
	paddingHorizontal: spacing.medium,
}
const TEXT: TextStyle = {
	color: color.palette.white,
	fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: 'bold' }
const MIMIRWHITESTANDING: ImageStyle = {
	width: 180,
	height: 186,
	alignSelf: 'center',
	marginVertical: spacing.large,
	maxWidth: '100%',
}

const BLOCKCHAIN: ImageStyle = {
	width: 192,
	height: 184,
	alignSelf: 'center',
	marginVertical: spacing.large,
	maxWidth: '100%',
}

const CONTINUE: ViewStyle = {
	paddingVertical: spacing.medium,
	paddingHorizontal: spacing.medium,
	backgroundColor: color.palette.deepPurple,
}
const CONTINUE_TEXT: TextStyle = {
	...TEXT,
	...BOLD,
	fontSize: 13,
	letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: '#20162D' }
const FOOTER_CONTENT: ViewStyle = {
	paddingVertical: spacing.medium,
	paddingHorizontal: spacing.medium,
}

const CONGRATULATIONS_TEXT: TextStyle = {
	...TEXT,
	width: 240,
	letterSpacing: 0,
	fontSize: 20,
	marginBottom: spacing.large,
	textAlign: 'center',
	alignSelf: 'center',
	maxWidth: '100%',
}


export const WelcomeScreen = () => {
	const navigation = useNavigation()
	const nextScreen = () => navigation.navigate('demo')

	return (
		<View testID="WelcomeScreen" style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
				<Image source={MimirLogo} style={MIMIRWHITESTANDING} />
					<Text style={CONGRATULATIONS_TEXT} text="CONGRATULATIONS! " />
					<Text style={CONGRATULATIONS_TEXT} text="YOUR MIMIR WALLET HAS BEEN CREATED " />
				<Image source={BlockchainLogo} style={BLOCKCHAIN} />
			</Screen>
			<SafeAreaView style={FOOTER}>
				<View style={FOOTER_CONTENT}>
					<Button
						testID="next-screen-button"
						style={CONTINUE}
						textStyle={CONTINUE_TEXT}
						tx="welcomeScreen.continue"
						onPress={nextScreen}
					/>
				</View>
			</SafeAreaView>
		</View>
	)
}
