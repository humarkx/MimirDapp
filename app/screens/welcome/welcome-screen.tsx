import React from 'react'
import auth from '@react-native-firebase/auth'
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from 'react-native'
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image } from '../../components'
import { colors, spacing, typography } from '../../theme'
import { WelcomeScreenProps } from '../../@types/navigation'

const logout = require('../../../assets/images/logout.png')
const MimirLogo = require('../../../assets/images/mimir_white.png')
const BlockchainLogo = require('./blockchain.png')

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
	backgroundColor: colors.transparent.transparent,
	paddingHorizontal: spacing.medium,
}
const TEXT: TextStyle = {
	color: colors.palette.white,
	fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: 'bold' }
// const MIMIRWHITESTANDING: ImageStyle = {
// 	width: 180,
// 	height: 186,
// 	alignSelf: 'center',
// 	marginVertical: spacing.large,
// 	maxWidth: '100%',
// }

const MIMIRWHITESTANDING: ImageStyle = {
	marginVertical: 30,
	alignSelf: 'center',
	width: 180,
	height: 160,
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
	backgroundColor: colors.palette.deepPurple,
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
const LOGOUT_TEXT: TextStyle = {
	...TEXT,
	...BOLD,
	color: colors.palette.deepPurple,
	fontSize: 13,
	letterSpacing: 2,
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
const LOGOUT: ViewStyle = {
	paddingVertical: spacing.medium,
	paddingHorizontal: spacing.medium,
	backgroundColor: colors.palette.white,
}
export const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
	const nextScreen = () => navigation.navigate('Dashboard')

	const signOut = async () => {
		await auth()
			.signOut()
			.then(() => {
				// Sign-out successful.
			})
			.catch(error => {
				console.warn('Auth Error', error)
				// An error happened.
			})
	}

	return (
		<View testID="WelcomeScreen" style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={colors.transparent.transparent}>
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
				<View style={FOOTER_CONTENT}>
					<Button
						testID="next-screen-button"
						style={LOGOUT}
						textStyle={LOGOUT_TEXT}
						text={'LOGOUT'}
						onPress={signOut}
					/>
				</View>
			</SafeAreaView>
		</View>
	)
}
