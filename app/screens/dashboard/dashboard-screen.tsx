import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { ImageStyle, TextStyle, View, ViewStyle, StyleSheet } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'

import {
	Button,
	Header,
	Text,
	Screen,
	Wallpaper,
	AutoImage as Image,
} from '../../components'

import { color, spacing } from '../../theme'

const logoMimir = require('../../../assets/images/mimir_white.png')


const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
	backgroundColor: color.transparent,
	paddingHorizontal: spacing.medium,
}
const DEMO: ViewStyle = {
	paddingVertical: spacing.medium,
	paddingHorizontal: spacing.medium,
	backgroundColor: color.palette.deepPurple,
}
const FREE: ViewStyle = {
	borderRadius: 50,
	paddingVertical: spacing.medium,
	paddingHorizontal: spacing.medium,
	backgroundColor: '#78305F',
}
const BET: ViewStyle = {
	borderRadius: 50,
	paddingVertical: spacing.medium,
	paddingHorizontal: spacing.medium,
	backgroundColor: '#0EF3C5',
}
const BOLD: TextStyle = { fontWeight: 'bold' }
const DEMO_TEXT: TextStyle = {
	...BOLD,
	fontSize: 13,
	letterSpacing: 2,
}
const HEADER: TextStyle = {
	paddingTop: spacing.medium,
	paddingBottom: spacing.medium,
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
	fontSize: 28,
	lineHeight: 38,
	textAlign: 'center',
	marginBottom: spacing.medium,
}
const TAGLINE: TextStyle = {
	color: '#BAB6C8',
	fontSize: 15,
	lineHeight: 22,
	marginBottom: spacing.medium,
}
const MIMIR: ImageStyle = {
	marginVertical: 20,
	alignSelf: 'center',
	width: 60,
	height: 120,
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
const HEART: ImageStyle = {
	marginHorizontal: spacing.small,
	width: 10,
	height: 10,
	resizeMode: 'contain',
}
const HINT: TextStyle = {
	color: '#BAB6C8',
	fontSize: 12,
	lineHeight: 15,
	marginVertical: spacing.small,
}

export const DashboardScreen = () => {
	const navigation = useNavigation()
	const goBack = () => navigation.goBack()

	return (
		<View testID="DashboardScreen" style={FULL}>
			<Wallpaper />
			<Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
				<Header leftIcon="back" onLeftPress={goBack} style={HEADER} titleStyle={HEADER_TITLE} />
				<Image source={logoMimir} style={MIMIR} />
				<Text style={TITLE} preset="header" text="MimerUser123" />
				<View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
					<View>
						<AnimatedCircularProgress
							size={150}
							width={15}
							backgroundWidth={15}
							rotation={360}
							fill={85}
							tintColor="#78305F"
							backgroundColor="#fff"
						>
							{(fill) => <Text style={styles.points}>20:00</Text>}
						</AnimatedCircularProgress>
						<Text style={styles.actionLabel}>FREE TO PLAY</Text>
						<Button
							style={FREE}
							textStyle={DEMO_TEXT}
							text="JOIN"
							onPress={() => navigation.navigate('game')}
						/>
					</View>

					<View>
						<AnimatedCircularProgress
							size={150}
							width={15}
							rotation={360}
							backgroundWidth={15}
							fill={75}
							tintColor="#0EF3C5"
							backgroundColor="#fff"
						>
							{(fill) => <Text style={styles.points}>21:00</Text>}
						</AnimatedCircularProgress>
						<Text style={styles.actionLabel}>BET TO PLAY</Text>
						<Button
							style={BET}
							textStyle={DEMO_TEXT}
							text="JOIN"
							onPress={() => navigation.navigate('game')}
						/>
					</View>
				</View>
			</Screen>
		</View>
	)
}

const styles = StyleSheet.create({
	actionLabel: {
		color: '#ffffff',
		fontSize: 20,
		fontWeight: '500',
		marginBottom: 30,
		marginTop: 30,
		textAlign: 'center',
	},
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
})
