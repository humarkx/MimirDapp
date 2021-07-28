import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ImageStyle, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { Input } from 'react-native-elements'
import { Button, Text, Screen, Wallpaper, AutoImage as Image, Header, Spacer } from '../../components'
import { color, spacing } from '../../theme'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

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

const NEXT: TextStyle = {
	fontSize: 28,
	lineHeight: 38,
	textTransform: 'uppercase',
	textAlign: 'center',
	marginBottom: spacing.large,
}

const MIMIR: ImageStyle = {
	marginVertical: 20,
	alignSelf: 'center',
	width: 120,
	height: 100,
}

const INPUT: TextStyle = {
	fontWeight: 'bold',
}

const POT: ViewStyle = {
	paddingVertical: spacing.medium,
	paddingHorizontal: spacing.medium,
	backgroundColor: color.palette.white,
}
const TEXT: TextStyle = {
	color: color.palette.white,
}
const POT_TEXT: TextStyle = {
	...TEXT,
	...BOLD,
	color: color.palette.deepPurple,
	fontSize: 13,
	letterSpacing: 2,
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
				<Text style={NEXT} preset="default" text="Next game starts at:" />

				<View style={{ justifyContent: 'center', flexDirection: 'row', paddingBottom: 20 }}>
					<AnimatedCircularProgress
						size={150}
						width={10}
						rotation={360}
						backgroundWidth={10}
						fill={75}
						tintColor="#0EF3C5"
						backgroundColor="#fff">
						{fill => <Text style={styles.points}>21:00</Text>}
					</AnimatedCircularProgress>
				</View>

				<Text style={TITLE} preset="header" text="Place bet amount" />
				<Button
					testID="next-screen-button"
					style={[POT, { marginBottom: 20 }]}
					textStyle={POT_TEXT}
					text={'1,000'}
					disabled={true}
				/>
				<Button style={FREE} textStyle={DEMO_TEXT} text="PLACE BET" onPress={() => navigation.navigate('bet')} />

				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
					<Button testID="next-screen-button" style={POT} textStyle={POT_TEXT} text={'5000'} disabled={true} />
					<Button testID="next-screen-button" style={POT} textStyle={POT_TEXT} text={"TODAY'S POT"} disabled={true} />
				</View>
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
