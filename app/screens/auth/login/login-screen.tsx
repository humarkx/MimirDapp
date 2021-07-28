import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView, Alert } from 'react-native'
import { Input } from 'react-native-elements'
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image, Spacer } from '../../../components'
import { color, spacing, typography } from '../../../theme'

const mimirLogo = require('../../../..//assets/images/mimir_white.png')

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
const HEADER: TextStyle = {
	paddingTop: spacing.medium,
	paddingBottom: spacing.medium,
	paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
	...TEXT,
	...BOLD,
	fontSize: 12,
	lineHeight: 15,
	textAlign: 'center',
	letterSpacing: 1.5,
}
const TITLE_WRAPPER: TextStyle = {
	...TEXT,
	textAlign: 'center',
}
const TITLE: TextStyle = {
	...TEXT,
	...BOLD,
	fontSize: 28,
	lineHeight: 38,
	textAlign: 'center',
}
const ALMOST: TextStyle = {
	...TEXT,
	...BOLD,
	fontSize: 26,
	fontStyle: 'italic',
}
const BOWSER: ImageStyle = {
	alignSelf: 'center',
	marginVertical: spacing.large,
	maxWidth: '100%',
	width: 200,
	height: 180,
}
const CONTENT: TextStyle = {
	...TEXT,
	color: '#BAB6C8',
	fontSize: 15,
	lineHeight: 22,
	marginBottom: spacing.large,
}
const CONTINUE: ViewStyle = {
	paddingVertical: spacing.medium,
	paddingHorizontal: spacing.medium,
	backgroundColor: color.palette.deepPurple,
}
const SIGNUP: ViewStyle = {
	paddingVertical: spacing.medium,
	paddingHorizontal: spacing.medium,
	backgroundColor: color.palette.white,
}
const SIGNUP_TEXT: TextStyle = {
	...TEXT,
	...BOLD,
	color: color.palette.deepPurple,
	fontSize: 13,
	letterSpacing: 2,
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

export const LoginScreen = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigation = useNavigation()
	const nextScreen = () => navigation.navigate('demo')
	const signUp = () => navigation.navigate('SignUp')

	const signIn = async () => {
		await auth()
			.signInWithEmailAndPassword(email.trim(), password)
			.then(async userCredential => {
				const token = await auth().currentUser.getIdTokenResult()
				console.log(userCredential.user)
			})
			.catch(error => {
				if (error.code === 'auth/invalid-email') {
					Alert.alert('That email address is invalid!')
					console.log('That email address is invalid!')
					return
				}
				if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
					Alert.alert('The password is invalid or the user does not exist.')
					console.log('The password is invalid or the user does not exist.')
					return
				}
				Alert.alert(error.message)
				console.log(error.code)
				console.log(error.message)
			})
	}

	return (
		<View testID="LoginScreen" style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
				<Header style={HEADER} titleStyle={HEADER_TITLE} />
				<Text style={TITLE_WRAPPER}>
					<Text style={TITLE} text="THE LIVESTREAMED, " />
					<Text style={ALMOST} text="CRYPTO QUIZ APP" />
					<Text style={TITLE} text="!" />
				</Text>
				<Image source={mimirLogo} style={BOWSER} />
				<Input
					autoCapitalize={'none'}
					value={email}
					onChangeText={setEmail}
					textAlign={'center'}
					style={{ color: '#F5F5F5' }}
					placeholder="Username"
					leftIcon={{ type: 'font-awesome', name: 'user', color: '#F5F5F5' }}
				/>
				<Input
					autoCapitalize={'none'}
					value={password}
					onChangeText={setPassword}
					textAlign={'center'}
					style={{ color: '#F5F5F5' }}
					placeholder="Password"
					leftIcon={{ type: 'font-awesome', name: 'lock', color: '#F5F5F5' }}
					secureTextEntry
				/>
			</Screen>
			<SafeAreaView style={FOOTER}>
				<View style={FOOTER_CONTENT}>
					<Button
						disabled={!email || !password}
						testID="next-screen-button"
						style={CONTINUE}
						textStyle={CONTINUE_TEXT}
						tx="loginScreen.continue"
						onPress={signIn}
					/>
				</View>
				<Spacer />
				<View style={FOOTER_CONTENT}>
					<Button
						testID="next-screen-button"
						style={SIGNUP}
						textStyle={SIGNUP_TEXT}
						text={'CREATE ACCOUNT'}
						onPress={signUp}
					/>
				</View>
			</SafeAreaView>
		</View>
	)
}
