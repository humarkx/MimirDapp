import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ImageStyle, TextStyle, View, ViewStyle } from 'react-native'
import { Input } from 'react-native-elements'
import { Button, Text, Screen, Wallpaper, AutoImage as Image, Header } from '../../components'
import { color, spacing } from '../../theme'

const logoMimir = require('../../../assets/images/mimir_white.png')

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
	backgroundColor: color.transparent,
	paddingHorizontal: spacing.medium,
}

const FREE: ViewStyle = {
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

const MIMIR: ImageStyle = {
	marginVertical: 20,
	alignSelf: 'center',
	width: 220,
	height: 180,
}

const INPUT: TextStyle = {
	fontWeight: 'bold',
}

export const GameScreen = () => {
	const navigation = useNavigation()
	const goBack = () => navigation.goBack()

	return (
		<View testID="GameScreen" style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
				<Header leftIcon="back" onLeftPress={goBack} style={HEADER} titleStyle={HEADER_TITLE} />
				<Image source={logoMimir} style={MIMIR} />
				<Text style={TITLE} preset="header" text="Place bet amount" />

				<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
					<View>
						<Input placeholder="1,000" inputStyle={INPUT} textAlign={'center'} />
						<Button style={FREE} textStyle={DEMO_TEXT} text="PLACE BET" onPress={() => navigation.navigate('bet')} />
					</View>
				</View>
			</Screen>
		</View>
	)
}
