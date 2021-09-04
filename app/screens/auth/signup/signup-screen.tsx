import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView, Alert } from 'react-native'
import { Input } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import { Button, Header, Screen, Text, Wallpaper, AutoImage as Image, Spacer } from '../../../components'
import { register } from '../../../store/user/actions'
import { colors, spacing, typography } from '../../../theme'

const mimirLogo = require('../../../..//assets/images/mimir_white.png')

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
	paddingBottom: 50,
	paddingTop: 10,
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
	backgroundColor: colors.palette.deepPurple,
}
const SIGNUP: ViewStyle = {
	paddingVertical: spacing.medium,
	paddingHorizontal: spacing.medium,
	backgroundColor: colors.palette.white,
}
const SIGNUP_TEXT: TextStyle = {
	...TEXT,
	...BOLD,
	color: colors.palette.deepPurple,
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

export const SignUpScreen = () => {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigation = useNavigation()
	const login = () => navigation.goBack()
	const dispatch = useDispatch()

	const signUp = async () => {
		dispatch(register(username, email.trim(), password.trim()))
	}

	return (
		<View testID="SignUpScreen" style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={colors.transparent.transparent}>
				<Header style={HEADER} titleStyle={HEADER_TITLE} />

				<Image source={mimirLogo} style={BOWSER} />
				<Text style={TITLE_WRAPPER}>
					<Text style={TITLE} text="THE LIVESTREAMED, " />
					<Text style={ALMOST} text="CRYPTO QUIZ APP" />
					<Text style={TITLE} text="!" />
				</Text>
				{/*<Input*/}
				{/*	value={username}*/}
				{/*	onChangeText={setUsername}*/}
				{/*	textAlign={'center'}*/}
				{/*	style={{ color: '#F5F5F5' }}*/}
				{/*	placeholder="Username"*/}
				{/*	leftIcon={{ type: 'font-awesome', name: 'user', color: '#F5F5F5' }}*/}
				{/*/>*/}
				<Input
					autoCapitalize={'none'}
					value={username}
					onChangeText={setUsername}
					textAlign={'center'}
					style={{ color: '#F5F5F5' }}
					placeholder="Username"
					leftIcon={{ type: 'font-awesome', name: 'user', color: '#F5F5F5' }}
				/>
				<Input
					autoCapitalize={'none'}
					value={email}
					onChangeText={setEmail}
					textAlign={'center'}
					style={{ color: '#F5F5F5' }}
					placeholder="Email"
					leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#F5F5F5' }}
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
						testID="next-screen-button"
						style={CONTINUE}
						textStyle={CONTINUE_TEXT}
						text={'CREATE ACCOUNT'}
						onPress={signUp}
					/>
				</View>
				<Spacer />
				<View style={FOOTER_CONTENT}>
					<Button testID="next-screen-button" style={SIGNUP} textStyle={SIGNUP_TEXT} text={'LOGIN'} onPress={login} />
				</View>
			</SafeAreaView>
		</View>
	)
}
